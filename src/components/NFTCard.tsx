import ShadedBackground from "./utils/ShadedBackground";
import { Header4 } from "./utils/Headers";
import { ButtonNFT } from "./utils/Buttons";
import Image from "next/image";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { NFTDialogLented, NFTDialogMarketplace, NFTDialogOwned, NFTDialogRented } from "./NFTDialog";
import { dateFormater } from "@/utils/utils";

import { ReactNode } from "react";
import { FilledInput } from "./utils/Input";

interface NFTLoadingCardProps {
  borderTone: "pink" | "blue";
}

const NFTLoadingCard = ({ borderTone }: NFTLoadingCardProps) => (
  <ShadedBackground borderTone={borderTone} className="relative box-border h-[32vw] w-[20vw] animate-pulse p-[1vw]">
    <div className="relative h-[17.6vw] w-[17.6vw] rounded-[1vw] bg-black/25" />
    <div className="relative mb-[0.4vw] mt-[0.9vw] h-[1.7vw] w-[17.6vw] rounded-[0.25vw] bg-black/25" />
    <div className="relative h-[1vw] w-[17.6vw] rounded-[0.25vw] bg-black/25" />
    <div className="absolute bottom-[1vw] left-[1vw] h-[4vw] w-[17.6vw] rounded-[0.6vw] bg-black/25" />
  </ShadedBackground>
);

interface NFTCardBasisProps {
  NFT: NFTInfo;
  borderTone: "pink" | "blue";
  children?: ReactNode;
}

const NFTCardBasis = ({ NFT, borderTone, children }: NFTCardBasisProps) => {
  const isWithdrawable = !NFT.expirationDate || new Date().toISOString() > NFT.expirationDate;

  return (
    <ShadedBackground borderTone={borderTone} className="relative box-border h-[33vw] w-[20vw] p-[1vw]">
      <div className="relative h-[17.6vw] w-[17.6vw]">
        <Image
          fill
          style={{ objectFit: "contain" }}
          alt="NFT Image"
          src={NFT.image ?? ""}
          unoptimized={true}
          loading="eager"
          className="rounded-[1vw]"
        />
      </div>
      <Header4 className="mb-[0.4vw] mt-[0.9vw]">{NFT.title}</Header4>
      <p className="text-sm italic">{NFT.collectionName}</p>
      <FilledInput label="Rent Rate:" value={NFT.rentRate?.toString()} unit="ETH/HOUR" size="sm" />
      <FilledInput label="Collateral:" value={NFT.collateral?.toString()} unit="ETH" size="sm" />
      {!isWithdrawable && (
        <FilledInput label="Expires on:" value={dateFormater(NFT.expirationDate)} unit="" size="sm" />
      )}
      {children}
    </ShadedBackground>
  );
};

interface NFTCardProps {
  NFT: NFTInfo;
}

const NFTCardOwned = ({ NFT }: NFTCardProps) => (
  <NFTCardBasis NFT={NFT} borderTone="blue">
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <ButtonNFT tone="blue" mode="card">
          LENT
        </ButtonNFT>
      </AlertDialog.Trigger>
      <NFTDialogOwned NFT={NFT} />
    </AlertDialog.Root>
  </NFTCardBasis>
);

const NFTCardLented = ({ NFT }: NFTCardProps) => {
  const isWithdrawable = !NFT.expirationDate || new Date().toISOString() > NFT.expirationDate;

  return (
    <NFTCardBasis NFT={NFT} borderTone="blue">
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <ButtonNFT tone="blue" mode="card">
            {isWithdrawable ? "WITHDRAW" : "INFO"}
          </ButtonNFT>
        </AlertDialog.Trigger>
        <NFTDialogLented NFT={NFT} />
      </AlertDialog.Root>
    </NFTCardBasis>
  );
};

const NFTCardRented = ({ NFT }: NFTCardProps) => {
  return (
    <NFTCardBasis NFT={NFT} borderTone="pink">
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <ButtonNFT tone="pink" mode="card">
            {NFT.collateral ? "RETURN" : "INFO"}
          </ButtonNFT>
        </AlertDialog.Trigger>
        <NFTDialogRented NFT={NFT} />
      </AlertDialog.Root>
    </NFTCardBasis>
  );
};

const NFTCardMarketplace = ({ NFT }: NFTCardProps) => {
  return (
    <NFTCardBasis NFT={NFT} borderTone="pink">
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <ButtonNFT tone="pink" mode="card">
            RENT
          </ButtonNFT>
        </AlertDialog.Trigger>
        <NFTDialogMarketplace NFT={NFT} />
      </AlertDialog.Root>
    </NFTCardBasis>
  );
};

interface NFTCard {
  NFT: NFTInfo;
  NFTsType: NFTsType;
}

const NFTCard = ({ NFT, NFTsType }: NFTCard) => {
  switch (NFTsType) {
    case "myCollectionOwned":
      return <NFTCardOwned NFT={NFT} />;
    case "myCollectionLented":
      return <NFTCardLented NFT={NFT} />;
    case "myCollectionRented":
      return <NFTCardRented NFT={NFT} />;
    case "marketplace":
      return <NFTCardMarketplace NFT={NFT} />;
  }
};

export { NFTCard, NFTLoadingCard };
