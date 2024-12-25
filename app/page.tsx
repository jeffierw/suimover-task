"use client";
import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import type { Transaction as TX } from "@mysten/sui/transactions";

export default function Home() {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [digest, setDigest] = useState("");

  const getGoal = async (): Promise<TX | string> => {
    const tx = new Transaction();
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(true),
        tx.pure.bool(true),
        tx.pure.u64(2),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(false),
        tx.pure.bool(true),
        tx.pure.u64(1),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(true),
        tx.pure.bool(true),
        tx.pure.u64(2),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(false),
        tx.pure.bool(false),
        tx.pure.u64(1),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(true),
        tx.pure.bool(true),
        tx.pure.u64(2),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(false),
        tx.pure.bool(true),
        tx.pure.u64(2),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(true),
        tx.pure.bool(false),
        tx.pure.u64(1),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(false),
        tx.pure.bool(true),
        tx.pure.u64(2),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(true),
        tx.pure.bool(true),
        tx.pure.u64(2),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(false),
        tx.pure.bool(true),
        tx.pure.u64(3),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(true),
        tx.pure.bool(false),
        tx.pure.u64(3),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::walk`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.pure.bool(false),
        tx.pure.bool(false),
        tx.pure.u64(1),
      ],
    });
    tx.moveCall({
      target: `0xe283a855d889480c1e7ac1be37415a6fe4bcbfd79d1d648d45119bddd19da8e9::dougeon_easy::goal`,
      arguments: [
        tx.object(
          "0x94eca7c3b73e0679ca14ba0626d8f045c1d53e9448bd5f31be64d138a7f8bf93"
        ),
        tx.object(
          "0x068d5ff571b34d02fbe1cd0a8f748d496e3f626a4833bb238900e090343482e4"
        ),
        tx.object(
          "0x6dcb26d7ab1a669421e050bb775c63a9f9c4d131c14722276eac5abd254e1e15"
        ),
      ],
    });
    return tx;
  };
  return (
    <>
      <ConnectButton className="p-2" />
      <div className="flex flex-col items-center justify-center p-2 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {currentAccount && (
          <>
            <div>
              <button
                className="border p-2 round-full"
                onClick={async () => {
                  signAndExecuteTransaction(
                    {
                      transaction: await getGoal(),
                    },
                    {
                      onSuccess: (result) => {
                        console.log("executed transaction", result);
                        setDigest(result.digest);
                      },
                    }
                  );
                }}
              >
                Sign and execute transaction
              </button>
            </div>
            <div>Digest: {digest}</div>
          </>
        )}
      </div>
    </>
  );
}
