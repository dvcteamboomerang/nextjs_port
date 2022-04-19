import NavBar from "../components/NavBar/NavBar";
function WebpageTemplate({ children }) {
  return (
    <div className={"centerY flowY"}>
      <NavBar />
      {children}
    </div>
  );
}

export default WebpageTemplate;
