export default function FilterNotFound({ agreeFilterNotFound }) {
  return (
    <div>
      <h3>Can not found any game </h3>
      <h6>Please, check the provided info</h6>
      <button onClick={agreeFilterNotFound}>I agree!</button>
    </div>
  );
}
