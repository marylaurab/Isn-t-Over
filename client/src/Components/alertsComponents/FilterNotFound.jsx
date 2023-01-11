import style from '../../cssComponents/alertsCss/filterNotFound.module.css';

export default function FilterNotFound({ agreeFilterNotFound }) {
  return (
    <div className={style.container}>
    <div>
      <h3>Can not found any game </h3>
      <h5>Please, check the provided info</h5>
      <button onClick={agreeFilterNotFound} className={style.agreeButton}>I agree!</button>
    </div>
    </div>
  );
}
