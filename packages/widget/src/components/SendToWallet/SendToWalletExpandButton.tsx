import WalletIcon from '@mui/icons-material/Wallet';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import { useToAddressRequirements, useWidgetEvents } from '../../hooks';
import { useWidgetConfig } from '../../providers';
import {
  useBookmarkActions,
  useFieldActions,
  useSendToWalletStore,
  useSettings,
} from '../../stores';
import { DisabledUI, HiddenUI, WidgetEvent } from '../../types';

export const SendToWalletExpandButton: React.FC = () => {
  const { t } = useTranslation();
  const { disabledUI, hiddenUI } = useWidgetConfig();
  const { setFieldValue } = useFieldActions();
  const { setSelectedBookmark } = useBookmarkActions();
  const emitter = useWidgetEvents();
  const { showSendToWallet, toggleSendToWallet } = useSendToWalletStore();
  const { showDestinationWallet } = useSettings(['showDestinationWallet']);

  const { requiredToAddress } = useToAddressRequirements();

  if (
    !showDestinationWallet ||
    requiredToAddress ||
    hiddenUI?.includes(HiddenUI.ToAddress)
  ) {
    return null;
  }

  const handleClick = () => {
    if (showSendToWallet && !disabledUI?.includes(DisabledUI.ToAddress)) {
      setFieldValue('toAddress', '', { isTouched: true });
      setSelectedBookmark();
    }
    toggleSendToWallet();
    emitter.emit(
      WidgetEvent.SendToWalletToggled,
      useSendToWalletStore.getState().showSendToWallet,
    );
  };

  return (
    <Tooltip
      title={t('main.sendToWallet')}
      placement="bottom-end"
      enterDelay={400}
      arrow
    >
      <Button
        variant={showSendToWallet ? 'contained' : 'text'}
        onClick={handleClick}
        sx={{
          minWidth: 48,
          marginLeft: 1,
        }}
      >
        <WalletIcon />
      </Button>
    </Tooltip>
  );
};