import formatFingerprint from "./formatFingerprint";

declare global {
  interface Window { openpgp: any; }
}

async function generateFingerprint(privateKey: string): Promise<{ fingerprint: string; }> {
  if (!window.openpgp.readKey) {
    console.error("window.openpgp.readKey is not available");
    return { fingerprint: "" };
  }

  let key;
  try {
    key = await window.openpgp.readKey({ armoredKey: privateKey });
  } catch (err) {
    console.error("Error while executing readKey() function.");
    console.error(err);
    return { fingerprint: "" };
  }

  let fingerprint;
  try {
    fingerprint = await key.getFingerprint();
  } catch (err) {
    console.error("Error while executing getFingerprint() function.");
    console.error(err);
    return { fingerprint: "" };
  }

  if (typeof fingerprint !== "string" || fingerprint.trim() === "") {
    return { fingerprint: "" };
  }

  return { fingerprint: formatFingerprint(fingerprint) };
}

export default generateFingerprint;
