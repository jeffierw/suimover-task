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
  const [digest5, setDigest5] = useState("");
  const [digest6, setDigest6] = useState("");
  const [digest7, setDigest7] = useState("");
  const [digest8, setDigest8] = useState("");

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

  const getSimpleNFT = async (): Promise<TX | string> => {
    const tx = new Transaction();
    const encoder = new TextEncoder();
    const byteArray1 = encoder.encode("Simple NFT");
    const byteArray2 = encoder.encode("This is my first nft.");
    const byteArray3 = encoder.encode(
      "https://raw.githubusercontent.com/Typus-Lab/typus-asset/refs/heads/main/logo.png"
    );
    tx.moveCall({
      target: `0xbccf3732710974ca6ed41ee23e5328b9a6a63ee25ab0b1f25abeb6954a8467d1::simple_nft::mint_to_sender`,
      arguments: [
        tx.pure(bcs.vector(bcs.u8()).serialize(byteArray1)),
        tx.pure(bcs.vector(bcs.u8()).serialize(byteArray2)),
        tx.pure(bcs.vector(bcs.u8()).serialize(byteArray3)),
        tx.pure(bcs.vector(bcs.string()).serialize(["icon", "owner", "color"])),
        tx.pure(bcs.vector(bcs.string()).serialize(["Typus", "Pest", "black"])),
      ],
    });
    return tx;
  };

  const getKiosk = async (): Promise<TX | string> => {
    const tx = new Transaction();
    // const encoder = new TextEncoder();
    // const byteArray1 = encoder.encode("Simple NFT");
    // const byteArray2 = encoder.encode("This is my first nft.");
    // const byteArray3 = encoder.encode(
    //   "https://raw.githubusercontent.com/Typus-Lab/typus-asset/refs/heads/main/logo.png"
    // );

    tx.moveCall({
      target: `0x2::kiosk::default`,
    });

    // tx.moveCall({
    //   target: `0x2::kiosk::borrow_val`,
    //   typeArguments: [
    //     "<0x27321bc52766f3ed3f809524ca0149bdbbf01f7f18bdccc261eab2dc5fa14589::mover_nft::Tails>",
    //   ],
    //   arguments: [Kiosk, KioskOwnerCap, Tails],
    // });

    return tx;
  };

  const getTypusNFT = async (): Promise<TX | string> => {
    const tx = new Transaction();
    tx.moveCall({
      target: `0x27321bc52766f3ed3f809524ca0149bdbbf01f7f18bdccc261eab2dc5fa14589::mover_nft::free_mint_into_kiosk`,
      arguments: [
        tx.object(
          "0xbc583ae6c5a185ae1d74e7f979f0f57b3b579abc54b6d1141bf4f1889d98ec10"
        ),
        tx.object(
          "0x9d7f0ec42b5b1b790c893f2679c4edc1efe1d5f20ca63cf23c2460b0042d74d8"
        ),
        tx.object(
          "0xa31f8b44765952a1015360af08c65f9924ca0d3e0a65da7ce8337a6138fe5390"
        ),
        tx.object(
          "0xb4a6aaba9a13526d151d099c675c54fc98ceedae5c62d9f58c3dca4a7875723e"
        ),
        tx.object(
          "0x6e7eb56ac28de1408dd0470bf0e93317b535a3d41809bed75fcf9b85f0ec62c3"
        ),
        tx.object("0x8"),
      ],
    });
    return tx;
  };

  const getGoal2 = async (): Promise<TX | string> => {
    const tx = new Transaction();
    const [res1, res2] = tx.moveCall({
      target: `0x2::kiosk::borrow_val`,
      typeArguments: [
        "0x27321bc52766f3ed3f809524ca0149bdbbf01f7f18bdccc261eab2dc5fa14589::mover_nft::Tails",
      ],
      arguments: [
        tx.object(
          "0xb4a6aaba9a13526d151d099c675c54fc98ceedae5c62d9f58c3dca4a7875723e"
        ),
        tx.object(
          "0x6e7eb56ac28de1408dd0470bf0e93317b535a3d41809bed75fcf9b85f0ec62c3"
        ),
        tx.object(
          "0x31d8e1807cd200c82293394176aa417a69b43d914834f5fe4b1e841d511f0e4a"
        ),
      ],
    });
    const [res3] = tx.moveCall({
      target: `0xfe6547fbe5b84f9638e88157c5b641a5d059119cb7a8283ff4a53c49b211d318::exercise::goal_2`,
      arguments: [
        tx.object(
          "0x068d5ff571b34d02fbe1cd0a8f748d496e3f626a4833bb238900e090343482e4"
        ),
        tx.object(
          "0x6dcb26d7ab1a669421e050bb775c63a9f9c4d131c14722276eac5abd254e1e15"
        ),
        tx.object(
          "0xadbbdba13a09e7d1a5d52912acd3683b4104c0716f66038380d10b5d11f9d25c"
        ),
        res1,
      ],
    });
    tx.moveCall({
      target: `0x2::kiosk::return_val`,
      typeArguments: [
        "0x27321bc52766f3ed3f809524ca0149bdbbf01f7f18bdccc261eab2dc5fa14589::mover_nft::Tails",
      ],
      arguments: [
        tx.object(
          "0xb4a6aaba9a13526d151d099c675c54fc98ceedae5c62d9f58c3dca4a7875723e"
        ),
        res3,
        res2,
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
            <div>
              <div>
                <button
                  className="border p-2 round-full"
                  onClick={async () => {
                    signAndExecuteTransaction(
                      {
                        transaction: await getSimpleNFT(),
                      },
                      {
                        onSuccess: (result) => {
                          console.log("executed transaction", result);
                          setDigest5(result.digest);
                        },
                      }
                    );
                  }}
                >
                  Sign and execute transaction task5
                </button>
              </div>
              <div>Digest: {digest5}</div>
            </div>
            <div>
              <div>
                <button
                  className="border p-2 round-full"
                  onClick={async () => {
                    signAndExecuteTransaction(
                      {
                        transaction: await getKiosk(),
                      },
                      {
                        onSuccess: (result) => {
                          console.log("executed transaction", result);
                          setDigest6(result.digest);
                        },
                      }
                    );
                  }}
                >
                  Sign and execute transaction task6
                </button>
              </div>
              <div>Digest: {digest6}</div>
            </div>
            <div>
              <div>
                <button
                  className="border p-2 round-full"
                  onClick={async () => {
                    signAndExecuteTransaction(
                      {
                        transaction: await getTypusNFT(),
                      },
                      {
                        onSuccess: (result) => {
                          console.log("executed transaction", result);
                          setDigest7(result.digest);
                        },
                      }
                    );
                  }}
                >
                  Sign and execute transaction task7
                </button>
              </div>
              <div>Digest: {digest7}</div>
            </div>
            <div>
              <div>
                <button
                  className="border p-2 round-full"
                  onClick={async () => {
                    signAndExecuteTransaction(
                      {
                        transaction: await getGoal2(),
                      },
                      {
                        onSuccess: (result) => {
                          console.log("executed transaction", result);
                          setDigest8(result.digest);
                        },
                      }
                    );
                  }}
                >
                  Sign and execute transaction task8
                </button>
              </div>
              <div>Digest: {digest8}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
