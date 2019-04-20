import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import ReactSpeedometer from "react-d3-speedometer";
/*
React uygulaması broadcast dinleyicisi rolünde.
Socket.io-client modülünü bu nedenle referans ediyor.
Ayrıca görsel metrikler için react-d3-speedometer paketini kullanıyor.
*/

class App extends Component {
  constructor() {
    super();

    // state değişkenlerimizde hızı, sıcaklığı, devri ve endpoint adresini tutuyoruz
    this.state = {
      speed: 0,
      rpm: 0,
      heat: 0,
      endpoint: "http://localhost:5555"
    };
  }

  /*
  componentDidMount yaşam döngüsü düşünüldüğünde
  component Document Object Model'e eklendiğinde devreye giren metodumuz.
  soket bağlantısını gerçekleştirip, "output data" yayınına abone oluyoruz.
  */
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    //console.log(`${endpoint} adresine bağlantı yapılıyor...`);
    // output road'dan veri geldikçe bunları state değişkenlerine atıyoruz
    socket.on("output road", data => {
      this.setState({
        speed: data.engineData.speed,
        heat: data.engineData.heat,
        rpm: data.engineData.rpm
      });

      //console.log(`Gelen bilgi : ${data.engineData.speed}`);
    });
  }

  /*
  Bileşenin render edildiği metod.
  state değişkenlerini alıp, div elementindeki ReactSpeedometer kontrollerinde gösteriyoruz.
  */
  render() {
    const { heat } = this.state;
    const { rpm } = this.state;
    const { speed } = this.state;

    return (
      <div style={{ textAlign: "center" }}>
        <h2>Hız</h2>
        <ReactSpeedometer
          maxValue={200}
          minValue={70}
          value={speed}
          needleColor="gray"
          startColor="orange"
          segments={10}
          endColor="red"
          needleTransition={"easeElastic"}
          ringWidth={20}
          textColor={"black"}
        />

        <h2>RPM</h2>
        <ReactSpeedometer
          maxValue={10000}
          minValue={1000}
          value={rpm}
          needleColor="gray"
          startColor="orange"
          segments={100}
          maxSegmentLabels={10}
          endColor="red"
          needleTransition={"easeElastic"}
          ringWidth={20}
          textColor={"black"}
        />

        <h2>Motor Isısı</h2>
        <ReactSpeedometer
          maxValue={500}
          minValue={100}
          value={heat}
          needleColor="gray"
          startColor="orange"
          segments={5}
          endColor="red"
          needleTransition={"easeElastic"}
          ringWidth={20}
          textColor={"black"}
        />
      </div>
    )
  }
}

export default App;
