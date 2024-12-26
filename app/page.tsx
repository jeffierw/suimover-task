"use client";
import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import type { Transaction as TX } from "@mysten/sui/transactions";
import { bcs } from "@mysten/sui/bcs";

export default function Home() {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [digest1, setDigest1] = useState("");
  const [digest2, setDigest2] = useState("");
  const [digest4, setDigest4] = useState("");
  const client = useSuiClient();

  const getSolve = async (): Promise<TX | string> => {
    const tx = new Transaction();
    tx.moveCall({
      target: `0x2ee85ec61775745b66bdc11039077c842db95a8cc736313a22fee6e5dc1798c1::beginner_village::solve`,
      arguments: [
        tx.object(
          "0x068d5ff571b34d02fbe1cd0a8f748d496e3f626a4833bb238900e090343482e4"
        ),
        tx.object(
          "0x6dcb26d7ab1a669421e050bb775c63a9f9c4d131c14722276eac5abd254e1e15"
        ),
        tx.pure.string("pest26"), // letter + number
        tx.pure.u64(738), // (crew_index_u64 * 618 + 3140) / crew_index_u64  crew_index_u64: 26
        tx.pure.bool(true), // crew.index() % 2 == 0
      ],
    });
    if (currentAccount?.address) {
      tx.setSender(currentAccount?.address);
      const dryRunRes = await client.dryRunTransactionBlock({
        transactionBlock: await tx.build({ client }),
      });
      if (dryRunRes.effects.status.status === "failure") {
        console.log("test", dryRunRes.effects.status.error);
      }
    }
    return tx;
  };

  const getPirate = async (): Promise<TX | string> => {
    const tx = new Transaction();
    const tier = 100;
    const EXERCISE_2_PACKAGE =
      "0xb2b8178c2d44be7e42836681d774aa743d692b72e03f0b67224419e69510ecd6";
    const myKapyCrew = tx.object(
      "0x6dcb26d7ab1a669421e050bb775c63a9f9c4d131c14722276eac5abd254e1e15"
    );
    const pickaxeStore = tx.object(
      "0x01a84f508b052c75b47f2ae42606ffbd9f1b86a265a5ec15682d3e9ad6bf1a89"
    );
    const correctMine = tx.object(
      "0xd67c234e18cf8641208b05c74b268572e9a888fde5a3ce98928b52f1433a341b"
    );
    const kapyWorld = tx.object(
      "0x068d5ff571b34d02fbe1cd0a8f748d496e3f626a4833bb238900e090343482e4"
    );
    // crew.index() % num_of_mines() != mine.index() 26 % 5 = 1
    // 1. split coin to buy higher tier pickaxe
    const [payment] = tx.splitCoins(tx.gas, [tier * 10]);
    const [pickaxe] = tx.moveCall({
      target: `${EXERCISE_2_PACKAGE}::pickaxe::buy`,
      arguments: [pickaxeStore, tx.pure.u8(tier), payment],
    });

    // 2. eploit to get Ore.
    const [ore] = tx.moveCall({
      target: `${EXERCISE_2_PACKAGE}::mine::exploit`,
      arguments: [correctMine, myKapyCrew, pickaxe],
    });

    // 3. destory pickaxe
    tx.moveCall({
      target: `${EXERCISE_2_PACKAGE}::pickaxe::destroy`,
      arguments: [pickaxe],
    });

    // 4. forge the Ore to get Sword.
    const [sword] = tx.moveCall({
      target: `${EXERCISE_2_PACKAGE}::foundry::forge`,
      arguments: [ore],
    });

    // 5. recruit the pirate with the sword.
    tx.moveCall({
      target: `${EXERCISE_2_PACKAGE}::swordsman_village::recurit`,
      arguments: [kapyWorld, myKapyCrew, sword],
    });

    if (currentAccount?.address) {
      tx.setSender(currentAccount?.address);
      const dryRunRes = await client.dryRunTransactionBlock({
        transactionBlock: await tx.build({ client }),
      });
      if (dryRunRes.effects.status.status === "failure") {
        console.log("test", dryRunRes.effects.status.error);
      }
    }
    return tx;
  };

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
              <div>
                <button
                  className="border p-2 round-full"
                  onClick={async () => {
                    signAndExecuteTransaction(
                      {
                        transaction: await getSolve(),
                      },
                      {
                        onSuccess: (result) => {
                          console.log("executed transaction", result);
                          setDigest1(result.digest);
                        },
                      }
                    );
                  }}
                >
                  Sign and execute transaction task1
                </button>
              </div>
              <div>Digest: {digest1}</div>
            </div>
            <div>
              <div>
                <button
                  className="border p-2 round-full"
                  onClick={async () => {
                    signAndExecuteTransaction(
                      {
                        transaction: await getPirate(),
                      },
                      {
                        onSuccess: (result) => {
                          console.log("executed transaction", result);
                          setDigest2(result.digest);
                        },
                      }
                    );
                  }}
                >
                  Sign and execute transaction task2
                </button>
              </div>
              <div>Digest: {digest2}</div>
            </div>
            <div>
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
                          setDigest4(result.digest);
                        },
                      }
                    );
                  }}
                >
                  Sign and execute transaction task4
                </button>
              </div>
              <div>Digest: {digest4}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
