import styles from "@/components/domains/damAi/DamAiTable.module.scss";
import { convertDate } from "@/utils/convertDate";
import { formatDate } from "@/utils/formatDate";
import React from "react";

interface DamAiTableProps {
  data: IDamAiRecord[]; // dataを受け取る
}

export const DamAiTable: React.FC<DamAiTableProps> = (props) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th>scoringAiId</th>
        <th>songTitle</th>
        <th>score</th>
        <th>date</th>
      </tr>
    </thead>
    <tbody>
      {props.data.map((item) => (
        <tr key={item.scoringAiId}>
          <td>{item.scoringAiId}</td>
          <td>
            <p>{item.contentsName}</p>
            <p>{item.artistName}</p>
          </td>
          <td>{Number(item.score) / 1000}点</td>
          <td>{formatDate(convertDate(item.scoringDateTime))}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
