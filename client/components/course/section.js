export default function Section(prop) {
  const { secNum, secTitle, secTime } = prop
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <p className="mx-2">{secNum}</p>
          <p>{secTitle}</p>
        </div>
        <p>{secTime}</p>
      </div>
    </>
  )
}
