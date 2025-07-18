import React from "react";

import { copyTextToClipboard } from '../utils';

interface IViewKeyProps {
  gpgKey: string;
  keyType: string;
}

function ViewKey({ gpgKey, keyType }: IViewKeyProps): React.ReactElement {
  return (
    <div className="relative isolate flex">
      <textarea
        className="border-2 border-solid pl-9 font-mono container max-w-3xl overflow-auto"
        rows={5}
        cols={64}
        wrap="off"
        defaultValue={gpgKey}
        placeholder={`${keyType} key`}
        disabled={true}
      />
      {(typeof gpgKey === "string" && gpgKey.trim().length > 0) && (
        <img
          src="images/copy.svg"
          alt={`copy ${keyType} key`}
          height="32"
          width="32"
          onClick={(event) => { copyTextToClipboard(event, gpgKey); }}
          className="absolute left-1 top-3 cursor-pointer bg-gray-100 hover:bg-gray-200"
        />
      )}
    </div>
  );
}

export default ViewKey;
