import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Create Document Component
const PdfDocument = async (area:string) => {
  const element = document.body; // Or target a specific element like document.getElementById("app-container")
  const topics = element.querySelector('.topics')
  const summary = element.querySelector('.summary')
  const canvasContainer = element.querySelector('.canvas')
  const buttons = element.querySelectorAll('button')
  const heading = element.querySelector('h1')
  if(topics && summary && heading && canvasContainer) {
    heading.setAttribute('style','display: none;')
    topics.setAttribute('style','display: none;')
    canvasContainer.setAttribute('style','margin: auto;')
    summary.setAttribute('style','color: #333333;')
    buttons.forEach((btn) => btn.setAttribute('style', 'display: none;'))
  }
  
  const canvas = await html2canvas(element, { scale: 2 }); // Higher scale for better quality
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('landscape', 'mm', 'a4'); // Set landscape mode
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, 'PNG', 0, 0, width, height); // Fit to page
  pdf.save(`${area}_summary.pdf`);
  heading?.removeAttribute('style');
  topics?.removeAttribute('style');
  summary?.removeAttribute('style');
  canvasContainer?.removeAttribute('style');
  buttons?.forEach((btn) => btn.removeAttribute('style'));
};

export default PdfDocument