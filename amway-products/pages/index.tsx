import React, { ReactNode } from "react";

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
  const [kone, setKone] = React.useState<string>("0");
  const [cartridge, setCartridge] = React.useState<string>("0");
  const [recipient, setRecipient] = React.useState<string>("None");
  const [result, setResult] = React.useState<number>(0);
  const [resultArr, setArr] = React.useState<Array<Amway>>([]);

  //get final price of Kone
  const finalPriceOfKone = (kone: number): number => {
    if (recipient === "Associate") {
      return koneIniPrice * kone * 0.95;
    }
    if (kone >= 3) {
      return konePromoPrice * kone;
    }
    return koneIniPrice * kone * 0.8;
  };
  //get final price of Ironhide Cartridge
  const finalPriceOfCartridge = (cartridge: number): number => {
    if (recipient === "Associate") {
      return cartridgeIniPrice * cartridge * 0.95;
    }
    if (cartridge >= 3) {
      return (
        (cartridgeIniPrice * (cartridge - (cartridge % 3)) * 2) / 3 +
        cartridgeIniPrice * (cartridge % 3)
      );
    }
    return cartridgeIniPrice * cartridge * 0.8;
  };
  //handle submit and return result
  const onSubmit = (): void => {
    setResult(parseInt(kone) + parseInt(cartridge));
    // const koneFinalPrice: number = finalPriceOfKone(parseInt(kone));
    // const cartridgeFinalPrice: number = finalPriceOfCartridge(
    //   parseInt(cartridge)
    // );
    // setResult(koneFinalPrice + cartridgeFinalPrice);
    // setArr([
    //   ...resultArr,
    //   {
    //     level: recipient,
    //     kone: parseInt(kone),
    //     cartridge: parseInt(cartridge),
    //     result: koneFinalPrice + cartridgeFinalPrice,
    //   },
    // ]);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "orange" }}>Amway Business</h1>
      <div>
        {/* Submit form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {/* Input for selecting Associate or Diamond */}
          <div>
            <label>Associate</label>
            <input
              style={{ marginRight: "2em" }}
              name="recipient"
              id="recipient-associate"
              type="radio"
              value="Associate"
              onChange={(e) => {
                setRecipient(e.target.value);
                setResult(0);
              }}
            />
            <label>Diamond</label>
            <input
              type="radio"
              name="recipient"
              id="recipient-diamond"
              value="Diamond"
              onChange={(e) => {
                setRecipient(e.target.value);
                setResult(0);
              }}
            />
          </div>
          {/* Input for Kone amount */}
          <div style={{ marginBottom: "2em", marginTop: "2em" }}>
            <div style={{ marginBottom: "1em" }}>
              <label>Input Kone Amount: </label>
              <input
                id="amount-kone"
                name="kone"
                type="text"
                placeholder="Numbers only"
                onChange={(e) => {
                  // Validate if input contains numbers only
                  if (
                    (isNaN(parseInt(e.target.value)) &&
                      e.target.value !== "") ||
                    parseInt(e.target.value).toString().length !==
                      e.target.value.length
                  ) {
                    alert("Please input numbers only");
                    e.target.value = "";
                    setKone("0");
                  } else {
                    setKone(e.target.value);
                    setResult(0);
                  }
                }}
              />
            </div>
            {/* Input for Cartridge amount */}
            <div>
              <label>Input Ironhide Cartridge Amount: </label>
              <input
                id="amount-cartridge"
                name="cartridge"
                type="text"
                placeholder="Numbers only"
                onChange={(e) => {
                  // Validate if input contains numbers only
                  if (
                    (isNaN(parseInt(e.target.value)) &&
                      e.target.value !== "") ||
                    parseInt(e.target.value).toString().length !==
                      e.target.value.length
                  ) {
                    alert("Please input numbers only");
                    e.target.value = "";
                    setCartridge("0");
                  } else {
                    setCartridge(e.target.value);
                    setResult(0);
                  }
                }}
              />
            </div>
          </div>

          {/* Display current content of each category */}
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
              <span id="final-price">¥{result.toFixed(2)}</span>
            </h2>
          </div>
          <div>
            <button
              style={{
                marginRight: "2em",
                fontSize: "1.2em",
                backgroundColor: "gray",
              }}
              type="reset"
              onClick={() => {
                setRecipient("None");
                setKone("0");
                setCartridge("0");
                setResult(0);
              }}
            >
              Reset
            </button>
            <button
              style={{ fontSize: "1.2em", backgroundColor: "lightgreen" }}
              type="button"
              onClick={() => onSubmit()}
              id="btn-calculate"
            >
              Calculate
            </button>
          </div>
        </form>

        {/* Display calculation history */}
        <div style={{ marginTop: "2em", color: "gray" }}>
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
                    <td>
                      <span>{item?.level}</span>
                    </td>
                    <td>{item?.kone}</td>
                    <td>{item?.cartridge}</td>
                    <td>{item?.result.toFixed(2)}</td>
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
