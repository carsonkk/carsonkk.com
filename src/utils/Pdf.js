import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function HtmlToPdf(selector, quality) {
  const filename = 'resumexs.pdf'
  html2canvas(
    document.querySelector(selector), 
    {scale: quality}
  ).then(canvas => {
    let pdf = new jsPDF('p', 'mm', 'a4')
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 1, 1, 212, 299)
    pdf.save(filename)
  })
}
