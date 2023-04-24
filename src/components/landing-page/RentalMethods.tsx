import { useState } from "react";
import Carousel, { ControlProps } from "nuka-carousel";
import { NavigationButton } from "../utils/Buttons";
import { Header1, Header2 } from "../utils/Headers";
import ShadedBackground from "../utils/ShadedBackground";

const RentalMethods = () => {
  const [title, setTitle] = useState("Collateralized");

  const collateralized = {
    description:
      "On collateralized loans, the renter is able to own the NFT by paying the rental price and putting up collateral to safeguard the lenter if he doesn’t return the NFT.",
    steps: [
      "The lenter transfers his NFT to an escrow smart contract where the collateral value and the rental rate are also defined.",
      "The renter transfers the collateral value and the rental value associated with the rental period to the escrow smart contract. The renter will then receive ownership of the NFT",
      "Once the rental period ends, the lenter is able to claim the rental value while the renter must return te NFT to the escrow smart contract. If the NFT hasn’t been returned, the lenter is able to claim the collateral value as well.",
    ],
    advantages: [
      "By actually owning the NFT, the renter can access all of its utility regardless of support for rental protocols",
    ],
    disadvantages: [
      "There is a high financial entry barrier for the renter",
      "The lenter risks losing the NFT, which can be specially damaging if the NFT price surges ahead of the collateral",
    ],
  };

  const nonCollateralized = {
    description:
      "On non-collateralized loans, the renter pays the rental price and receives a wrapped token with the same properties as the NFT. The NFT remains on an escrow smart contract which can be accessed by the owner.",
    steps: [
      "The lenter transfers his NFT to an escrow smart contract where the rental rate is also defined.",
      "The renter transfer the rental value associated with the rental period to the escrow smart contract. The renter will then receive a wrapped token representing the NFT",
      "Once the rental period ends, the lenter is able to claim the rental value as well as its NFT while the renter becomes unable to use the wrapped token. If the lenter wishes he can leave the NFT on the smart contract for others to rent it using the same dynamic.",
    ],
    advantages: [
      "The lenter remains in control of the NFT",
      "The renter becomes automatically unable to use the NFT once the rental period ends",
    ],
    disadvantages: ["The ecosystem will have to adopt the standard in order to become usable"],
  };

  const toggleTitle = (titleState: string) =>
    titleState === "Collateralized" ? "Non-Collateralized" : "Collateralized";

  const topRightControls = (props: ControlProps) => (
    <div className="mr-[4vw] mt-[-4.25vw] flex w-[7vw] flex-row items-center justify-between">
      <NavigationButton
        direction={"left"}
        onClick={() => {
          setTitle(toggleTitle);
          props.previousSlide();
        }}
      />
      <NavigationButton
        direction={"right"}
        onClick={() => {
          setTitle(toggleTitle);
          props.nextSlide();
        }}
      />
    </div>
  );

  return (
    <div>
      <Header1 className="mb-[1.5vw] ml-[4vw] mt-[4vw]">How It Works</Header1>
      <Header2 className="mb-[1.5vw] ml-[4vw]">{title}</Header2>
      <Carousel
        wrapAround
        renderCenterLeftControls={null}
        renderCenterRightControls={null}
        renderBottomCenterControls={null}
        renderTopRightControls={topRightControls}
      >
        <RentalMethod {...collateralized} />
        <RentalMethod {...nonCollateralized} />
      </Carousel>
    </div>
  );
};

interface RentalMethodProps {
  description: string;
  steps: string[];
  advantages: string[];
  disadvantages: string[];
}

const RentalMethod = ({ description, steps, advantages, disadvantages }: RentalMethodProps) => (
  <ShadedBackground className="mx-auto flex w-[92vw] flex-col justify-start p-[2.25vw]">
    <p className="mb-[1.5vw] text-lg font-medium ">{description}</p>
    {steps.map((step, index) => (
      <div key={step}>
        <h5 className="mb-[0.75vw] font-highlight text-xl ">{`Step ${index + 1}`}</h5>
        <p className="mb-[1.5vw] text-lg font-medium ">{step}</p>
      </div>
    ))}
    <div className="flex flex-row items-start justify-around">
      <Characteristics title="Advantages" items={advantages} />
      <Characteristics title="Disadvantages" items={disadvantages} />
    </div>
  </ShadedBackground>
);

interface CharacteristicsProps {
  title: string;
  items: string[];
}

const Characteristics = ({ title, items }: CharacteristicsProps) => (
  <div className="w-[37.5vw]">
    <h4 className="mb-[0.75vw] text-center font-highlight text-2xl ">{title}</h4>
    {items.map((item) => (
      <p className="mb-[1vw] text-lg font-medium " key={item}>
        {item}
      </p>
    ))}
  </div>
);

export default RentalMethods;
