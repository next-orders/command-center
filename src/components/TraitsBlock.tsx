import { ClientTrait } from "@next-orders/api-sdk";
import { HoverDropdown } from "@/components/HoverDropdown";
import { ClientTraitBadge } from "@/components/ClientTraitBadge";

type TraitsBlockProps = {
  traits: ClientTrait[];
};

export const TraitsBlock = ({ traits }: TraitsBlockProps) => {
  // Min 3 to show, if less - add blank
  if (traits.length === 0) {
    traits.push(
      {
        id: "blank1",
        type: "BLANK",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "blank2",
        type: "BLANK",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "blank3",
        type: "BLANK",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );
  }
  if (traits.length === 1) {
    traits.push(
      {
        id: "blank1",
        type: "BLANK",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "blank2",
        type: "BLANK",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );
  }
  if (traits.length === 2) {
    traits.push({
      id: "blank1",
      type: "BLANK",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  const threeTraits = traits?.map((trait) => (
    <HoverDropdown
      key={trait.id}
      dropdown={<DropdownHintByTraitType type={trait.type} />}
    >
      <div className="cursor-default md:hover:scale-125 hover:drop-shadow-md duration-200">
        <ClientTraitBadge size="lg" type={trait.type} />
      </div>
    </HoverDropdown>
  ));

  return (
    <div className="flex flex-row gap-2 justify-center md:group-hover:scale-105 duration-300">
      {threeTraits}
    </div>
  );
};

const DropdownHintByTraitType = ({ type }: { type: ClientTrait["type"] }) => {
  if (type === "BLANK") {
    return (
      <div>
        No Trait here. Wait a while, the client will probably receive it.
      </div>
    );
  }
  if (type === "ORDERLY") {
    return (
      <div>
        Client have a <b>Orderly Trait</b>. Often orders, but for small amounts.
      </div>
    );
  }
  if (type === "SPONTANEOUS") {
    return (
      <div>
        Client have a <b>Spontaneous Trait</b>. Rarely orders, but for large
        amounts.
      </div>
    );
  }
  if (type === "COLD") {
    return (
      <div>
        Client have a <b>Cold Trait</b>. Hasn&apos;t ordered for a long time.
      </div>
    );
  }
  if (type === "WELL_FED") {
    return (
      <div>
        Client have a <b>Well-fed Trait</b>. Often orders for large amounts.
      </div>
    );
  }
  if (type === "SATISFIED") {
    return (
      <div>
        Client have a <b>Satisfied Trait</b>. Happy with everything and always.
      </div>
    );
  }
  if (type === "PICKY") {
    return (
      <div>
        Client have a <b>Picky Trait</b>. Always dissatisfied.
      </div>
    );
  }
  if (type === "CAUTIOUS") {
    return (
      <div>
        Client have a <b>Cautious Trait</b>. Don&apos;t know what&apos;s on the
        client&apos;s mind.
      </div>
    );
  }

  return <div>No hint here.</div>;
};
