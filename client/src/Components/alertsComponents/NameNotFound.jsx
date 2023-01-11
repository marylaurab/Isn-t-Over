import style from '../../cssComponents/alertsCss/nameNotFound.module.css';


export default function NameNotFound({ resetHome }) {
  return (
    <div className={style.container}>
    <div>
      <h3>Can not found any game with that name</h3>
      <h4>Please, check the info provided</h4>
      <button onClick={resetHome} className={style.agreeButton}>I agree!</button>
    </div>
    </div>
  );
}
