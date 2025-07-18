function formatFingerprint(rawFingerprint: string): string {
  let formatted = "";

  rawFingerprint.split("").forEach((char, index) => {
    if (index !== 0 && index % 4 === 0) {
      formatted += " ";
    }

    formatted += char.toUpperCase();
  });

  return formatted;
}

export default formatFingerprint;
