export default function NameNotFound({ resetHome }) {
  return (
    <div>
      <h3>Can not found any game with that name</h3>
      <h6>Please, check the info provided</h6>
      <button onClick={resetHome}>I agree!</button>
    </div>
  );
}
