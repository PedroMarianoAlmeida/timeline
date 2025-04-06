import * as Tooltip from "@radix-ui/react-tooltip";

export function Tooltip({ trigger, content }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
        <Tooltip.Content side="top">{content}</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
