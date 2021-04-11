import { ReactNode, useState } from "react";

const koneIniPrice = 3488.99;
const konePromoPrice = 2588.99;
const cartridgeIniPrice = 529.99;

type Amway = {
  level: string;
  kone: number;
  cartridge: number;
  result: number;
};

const Home = (): ReactNode => {
  const [result, setResult] = useState<number>(0);
  const [resultArr, setArr] = useState<Array<Amway>>([]);
  const [recipient, setRecipient] = useState<string>("None");
  const [kone, setKone] = useState<string>("0");
  const [cartridge, setCartridge] = useState<string>("0");

  const finalPriceOfKone = (kone: number): number => {
    if (kone >= 3) {
      return konePromoPrice * kone;
    }
    if (recipient === "Associate") {
      return koneIniPrice * kone * 0.95;
    } else if (recipient === "Diamond") {
      return koneIniPrice * kone * 0.8;
    }
    return 0;
  };
  const finalPriceOfCartridge = (cartridge: number): number => {
    if (cartridge >= 3 && cartridge % 3 === 0) {
      return (
        (cartridgeIniPrice * (cartridge - (cartridge % 3)) * 2) / 3 +
        cartridgeIniPrice * (cartridge % 3)
      );
    }
    if (recipient === "Associate") {
      return cartridgeIniPrice * cartridge * 0.95;
    } else if (recipient === "Diamond") {
      return cartridgeIniPrice * cartridge * 0.8;
    }
    return 0;
  };
  const onSubmit = (): void => {
    const koneFinalPrice: number = finalPriceOfKone(parseInt(kone));
    const cartridgeFinalPrice: number = finalPriceOfCartridge(
      parseInt(cartridge)
    );
    console.log(koneFinalPrice, cartridgeFinalPrice);
    setResult((pre) => (pre = koneFinalPrice + cartridgeFinalPrice));
    setArr([
      ...resultArr,
      { level: "hello", kone: 1, cartridge: 1, result: 2 },
    ]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Amway Business</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div>
            <label>Associate</label>
            <input
              style={{ marginRight: "2em" }}
              name="recipient"
              type="radio"
              value="Associate"
              onChange={(e) => setRecipient((pre) => (pre = e.target.value))}
            />
            <label>Diamond</label>
            <input
              type="radio"
              name="recipient"
              value="Diamond"
              onChange={(e) => setRecipient((pre) => (pre = e.target.value))}
            />
          </div>
          <div style={{ marginBottom: "2em", marginTop: "2em" }}>
            <div style={{ marginBottom: "1em" }}>
              <label>Input Kone Amount: </label>
              <input
                type="text"
                onChange={(e) => setKone(() => e.target.value)}
              />
            </div>
            <div>
              <label>Input Ironhide Cartridge Amount: </label>
              <input
                type="text"
                onChange={(e) => setCartridge(() => e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginBottom: "2em" }}>
            <div style={{ color: "lightblue" }}>
              <label>Recipient: </label>
              <span>{recipient}</span>
              <span> | </span>
              <label>Kone: </label>
              <span>{kone}</span>
              <span> | </span>
              <label>Cartridge: </label>
              <span>{cartridge}</span>
            </div>
            <h2 style={{ marginTop: ".5em", color: "green" }}>
              <label>Result: </label>
              <span>${result.toFixed(2)}</span>
            </h2>
          </div>
          <div>
            <button
              style={{ marginRight: "2em", fontSize: "1.2em" }}
              type="reset"
              onClick={() => {
                setRecipient((pre) => (pre = "None"));
                setKone((pre) => (pre = "0"));
                setCartridge((pre) => (pre = "0"));
              }}
            >
              Reset
            </button>
            <button style={{ fontSize: "1.2em" }} type="submit">
              Calculate
            </button>
          </div>
        </form>
        <div style={{ marginTop: "2em" }}>
          {resultArr.length === 0 ? (
            <div>Results history will show here</div>
          ) : (
            <table style={{ margin: "auto" }}>
              <thead>
                <tr>
                  <th>Level -- </th>
                  <th>Kone -- </th>
                  <th>Cartridge -- </th>
                  <th>Result </th>
                </tr>
              </thead>
              <tbody>
                {resultArr?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item?.level}</td>
                    <td>{item?.kone}</td>
                    <td>{item?.cartridge}</td>
                    <td>{item?.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
