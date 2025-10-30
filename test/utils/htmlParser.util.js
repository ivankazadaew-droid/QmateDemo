export async function parseHtmlToText(htmlString) {
  const plainText = await browser.execute((html) => {
    const tempDiv = document.createElement('div');  
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';  
  }, htmlString);

  return plainText.trim().replace(/\s\s+/g, ' ');
}