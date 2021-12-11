import { useMemo } from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@masknet/theme'
import { useI18N } from '../../../utils'
import { CollectibleState } from '../hooks/useCollectibleState'
import ActionButton from '../../../extension/options-page/DashboardComponents/ActionButton'
import { useControlledDialog } from '../../../utils/hooks/useControlledDialog'
import { MakeOfferDialog } from './MakeOfferDialog'
import { CheckoutDialog } from './CheckoutDialog'

const useStyles = makeStyles()((theme) => {
    return {
        root: {
            marginLeft: theme.spacing(-0.5),
            marginRight: theme.spacing(-0.5),
        },
        button: {
            flex: 1,
            margin: `0 ${theme.spacing(0.5)}`,
        },
    }
})

export interface ActionBarProps {}

export function ActionBar(props: ActionBarProps) {
    const { t } = useI18N()
    const { classes } = useStyles()
    const { asset } = CollectibleState.useContainer()

    const assetSource = useMemo(() => {
        if (!asset.value || asset.error) return
        return asset.value
    }, [asset.value])

    const {
        open: openCheckoutDialog,
        onOpen: onOpenCheckoutDialog,
        onClose: onCloseCheckoutDialog,
    } = useControlledDialog()
    const { open: openOfferDialog, onOpen: onOpenOfferDialog, onClose: onCloseOfferDialog } = useControlledDialog()

    if (!asset.value) return null

    return (
        <Box className={classes.root} sx={{ marginTop: 1 }} display="flex" justifyContent="center">
            {!assetSource?.isSoldOut &&
            !assetSource?.is_owner &&
            assetSource?.is24Auction &&
            new Date(assetSource?.latestBidVo?.auctionEndTime ?? 0).getTime() > Date.now() ? (
                <ActionButton
                    className={classes.button}
                    color="primary"
                    fullWidth
                    variant="contained"
                    onClick={() => {
                        onOpenOfferDialog()
                    }}>
                    {t('plugin_collectible_place_bid')}
                </ActionButton>
            ) : null}
            {!assetSource?.isSoldOut &&
            !assetSource?.is24Auction &&
            (!assetSource?.trade?.latestBid || assetSource?.trade?.latestBid < assetSource?.priceInEth) &&
            assetSource?.trade?.isCanAuction ? (
                <ActionButton
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        onOpenOfferDialog()
                    }}>
                    {t('plugin_collectible_make_offer')}
                </ActionButton>
            ) : null}
            {!assetSource?.isSoldOut &&
            assetSource?.totalSurplus > 0 &&
            !assetSource?.is24Auction &&
            assetSource?.priceInEth < 100000 &&
            assetSource?.trade?.isCanBuy ? (
                <ActionButton
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={onOpenCheckoutDialog}>
                    {t('plugin_collectible_buy_now')}
                </ActionButton>
            ) : null}
            <CheckoutDialog asset={asset} open={openCheckoutDialog} onClose={onCloseCheckoutDialog} />
            <MakeOfferDialog asset={asset} open={openOfferDialog} onClose={onCloseOfferDialog} />
        </Box>
    )
}
