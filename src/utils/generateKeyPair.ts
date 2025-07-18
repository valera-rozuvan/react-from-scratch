import { IKeyConfig } from "../types";

interface IKeyOptions {
  type: string;
  curve?: string;
  rsaBits?: number;
  userIDs: Array<{ name: string; email: string; }>;
  passphrase: string;
  format: string;
}

async function generateKeyPair(name: string, email: string, passphrase: string, keyConfig: IKeyConfig): Promise<{ privateKey: string; publicKey: string; }> {
  if (!window.openpgp) {
    console.error("window.openpgp is not available");
    return { privateKey: "", publicKey: "", };
  }

  if (!window?.openpgp?.config?.rejectCurves) {
    console.warn(
      "window.openpgp.config.rejectCurves is not defined",
      "will not be able to use secp256k1",
      "it hasn't been standardized in RFC9580"
    );
  } else {
    // See discussion at https://github.com/openpgpjs/openpgpjs/discussions/1806 .
    window.openpgp.config.rejectCurves = new Set();
  }

  let keyPair;
  try {
    const options: IKeyOptions = {
      type: keyConfig.keyType,    // one of `ecc`, `rsa`
      userIDs: [{ name, email }], // it is possible to use multiple user IDs
      passphrase,                 // protects the private key; can be an empty string
      format: 'armored',          // output key format (other options are 'binary', 'object')
    };

    if (typeof keyConfig.keyCurve === "string") {
      options.curve = keyConfig.keyCurve;
    }
    if (typeof keyConfig.keyLength === "number") {
      options.rsaBits = keyConfig.keyLength;
    }

    keyPair = await window.openpgp.generateKey(options);
  } catch (err) {
    console.error("Error while executing generateKey() function.");
    console.error(err);
    return { privateKey: "", publicKey: "", };
  }

  if (!keyPair) {
    return { privateKey: "", publicKey: "", };
  }

  let privateKey = keyPair.privateKey;
  if (typeof privateKey !== "string") {
    privateKey = "";
  }

  let publicKey = keyPair.publicKey;
  if (typeof publicKey !== "string") {
    publicKey = "";
  }

  return { privateKey, publicKey };
}

export default generateKeyPair;
