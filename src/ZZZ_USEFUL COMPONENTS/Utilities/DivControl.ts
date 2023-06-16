export const removeOnlyText = (divRef:any) => {
    if (divRef.current) {
      const childNodes = Array.from(divRef.current.childNodes);
      childNodes.forEach((node:any) => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = ' ';
        }
      });
    }
  };