'use client';

import React from 'react';
import styles from '@/app/convert/page.module.scss';
import { tempData, tempDxgData } from '@/mock/tempData';
import { convertDamScores } from '@/utils/convertDamScores';
import { convertXmlToJson } from '@/utils/convertXmlToJson';

const Page = () => {
  const [initXml, setInitXml] = React.useState<string>('');
  const [initText, setInitText] = React.useState<string>('');
  const [text, setText] = React.useState<string>('');

  React.useEffect(() => {
    setInitText(JSON.stringify(tempData, null, 2));
  }, []);

  const handleXmlConvert = React.useCallback(async () => {
    try {
      const beforeJson = initXml;
      const result = await convertXmlToJson(beforeJson);
      setInitText(JSON.stringify(result, null, 2));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, [initXml]);

  const handleConvert = React.useCallback(async () => {
    try {
      const beforeJson = JSON.parse(initText);
      const result = convertDamScores(beforeJson);
      setText(JSON.stringify(result, null, 2));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, [initText]);

  return (
    <>
      <button onClick={() => setInitText(JSON.stringify(tempDxgData, null, 2))}>DXGに変更</button>
      <div className={styles.container}>
        <div className={styles.textarea}>
          <div>
            before<button onClick={handleXmlConvert}>変換</button>
          </div>

          <textarea value={initXml} onChange={(e) => setInitXml(e.target.value)} />
        </div>
        <div className={styles.textarea}>
          <textarea value={initText} onChange={(e) => setInitText(e.target.value)} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.textarea}>
          <div>
            before<button onClick={handleConvert}>変換</button>
          </div>

          <textarea value={initText} onChange={(e) => setInitText(e.target.value)} />
        </div>
        <div className={styles.textarea}>
          <div>after</div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div>
    </>
  );
};

export default Page;
