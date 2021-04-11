import { ReactNode, useState } from "react";

const koneIniPrice = 3488.99;
const konePromoPrice = 2588.99;
const cartridgeIniPrice = 529.99;

const Home = (): ReactNode => {
  const [result, setResult] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");
  const [kone, setKone] = useState<string>("0");
  const [cartridge, setCartridge] = useState<string>("0");

  const finalPriceOfKone = (kone: number): number => {
    if (kone >= 3) {
      return koneIniPrice * 2 + konePromoPrice * (kone - 2);
    }
    if (kone) return 0;
  };
  const finalPriceOfCartridge = (cartridge: number): number => {
    return 0;
  };
  const onSubmit = (): void => {
    const konePrice: number = finalPriceOfKone(parseInt(kone));
    const cartridgeFinalPrice: number = finalPriceOfCartridge(
      parseInt(cartridge)
    );
    setResult(() => parseInt(kone) + parseInt(cartridge));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Amway Products</h1>
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
              <label>Input Kone Amounts: </label>
              <input
                type="text"
                onChange={(e) => setKone(() => e.target.value)}
              />
            </div>
            <div>
              <label>Input Ironhide Cartridge Amounts: </label>
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
              <span>${result}</span>
            </h2>
          </div>
          <div>
            <button
              style={{ marginRight: "2em", fontSize: "1.2em" }}
              type="reset"
            >
              Reset
            </button>
            <button style={{ fontSize: "1.2em" }} type="submit">
              Calculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
