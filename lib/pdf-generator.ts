import { toast } from "sonner";

interface PDFGeneratorOptions {
  filename: string;
  margin?: number;
  quality?: number;
  pixelRatio?: number;
  toastId?: string | number;
}

/**
 * Generates a multi-page PDF from a DOM element using html-to-image and jsPDF.
 * Uses logical page breaking based on '.pdf-block' classes.
 */
export async function generatePDFFromElement(
  element: HTMLElement,
  options: PDFGeneratorOptions
): Promise<void> {
  const { 
    filename, 
    margin = 15, 
    quality = 0.95, 
    pixelRatio = 2,
    toastId 
  } = options;

  try {
    // Dynamic imports to ensure they only load on the client
    const { toJpeg } = await import("html-to-image");
    const { jsPDF } = await import("jspdf");

    // 1. Temporarily adjust element for optimal capture
    const originalStyle = element.style.cssText;
    element.style.width = '800px';
    element.style.maxWidth = '800px';
    element.style.height = 'auto';
    element.style.overflow = 'visible';

    // 2. Capture the entire element as a high-quality JPEG
    const imgData = await toJpeg(element, { 
      quality, 
      pixelRatio,
      backgroundColor: '#ffffff'
    });

    // 3. Initialize PDF document
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const contentWidth = pdfWidth - (margin * 2);
    const contentHeight = pageHeight - (margin * 2);

    const elementRect = element.getBoundingClientRect();
    
    // 4. Calculate dimensions and page breaks
    const pxToMm = contentWidth / elementRect.width;
    const pdfImgHeight = elementRect.height * pxToMm;
    const maxPageHeightPx = contentHeight / pxToMm;

    // Buffer to avoid cutting text too close to bottom margins
    const bufferPx = 5 / pxToMm;
    const effectiveMaxHeight = maxPageHeightPx - bufferPx;

    // Identify logical blocks for page breaking
    const blocks = Array.from(element.querySelectorAll('.pdf-block')) as HTMLElement[];
    const breaks = [0];
    let lastBreak = 0;

    blocks.forEach((block) => {
      const blockRect = block.getBoundingClientRect();
      const blockTop = blockRect.top - elementRect.top;
      const blockBottom = blockTop + blockRect.height;

      // If this block ends after the current page limit, break BEFORE it
      if (blockBottom - lastBreak > effectiveMaxHeight) {
        if (blockTop > lastBreak) {
          breaks.push(blockTop);
          lastBreak = blockTop;
        } else {
          // Force a break if a single block exceeds page height
          breaks.push(lastBreak + effectiveMaxHeight);
          lastBreak += effectiveMaxHeight;
        }
      }
    });
    
    if (breaks[breaks.length - 1] < elementRect.height) {
      breaks.push(elementRect.height);
    }

    // 5. Build PDF pages
    for (let i = 0; i < breaks.length - 1; i++) {
      if (i > 0) pdf.addPage();
      
      const startY = breaks[i];
      const endY = breaks[i+1];
      
      pdf.addImage(
        imgData, 
        "JPEG", 
        margin, 
        margin - (startY * pxToMm), 
        contentWidth, 
        pdfImgHeight,
        undefined,
        'FAST'
      );

      // Cover the part of the image that exceeds the page break
      const visibleHeightMm = (endY - startY) * pxToMm;
      if (visibleHeightMm < contentHeight) {
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, margin + visibleHeightMm, pdfWidth, pageHeight - (margin + visibleHeightMm), 'F');
      }

      // Cover top and bottom margins with white rectangles to prevent bleed
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pdfWidth, margin, 'F'); // Top margin
      pdf.rect(0, pageHeight - margin, pdfWidth, margin, 'F'); // Bottom margin
    }

    // 6. Finalize and clean up
    element.style.cssText = originalStyle;
    pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
    
    if (toastId) {
      toast.success("PDF berhasil diunduh!", { id: toastId });
    }
  } catch (error) {
    console.error("PDF generation failed:", error);
    if (toastId) {
      toast.error("Gagal mengunduh PDF. Silakan coba lagi.", { id: toastId });
    }
    throw error;
  }
}
