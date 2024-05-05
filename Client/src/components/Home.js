export default function Home() {
  return (
    <div className="home-container container-fluid">
      <div className="container">
        <div className="row custom-row">
          <div className="col-sm-12 welcome-msg">
            <h1>Welcome !</h1>
            <p>Hey, Everyone Let's take an attendance.</p>
          </div>
        </div>
      </div>
      <div className="row custom-row">
        <div className="col-sm-8 info-msg">
          <div className="info-box">
            <h3>For Students</h3>
            <p>Taking attendance is now easier. Just Scan the QR Code and your attendance is registered.</p>
          </div>
          <div className="info-box">
            <h3>For Teacher</h3>
            <p>Tracking attendance is now easier. Just Login to the dashboard and monitor each and every student performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}