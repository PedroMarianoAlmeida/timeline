import * as Tooltip from "@radix-ui/react-tooltip";
import "./tooltip.css"

export function Tooltip({ trigger, content }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
        <Tooltip.Content side="top">
          <div className="tooltip-text">{content}</div>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
