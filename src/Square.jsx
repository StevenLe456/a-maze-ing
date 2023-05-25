export default function Square({pos, state, player_in, enemy_in}) {
    if (player_in && enemy_in) {
        return (
            <button pos={toString(pos)} className={"square tile-" + toString(state & ((1 << 4) - 1))}>
                🆘
            </button>
        )
    }
    else if (player_in) {
        return (
            <button pos={toString(pos)} className={"square tile-" + toString(state & ((1 << 4) - 1))}>
                🦄
            </button>
        )
    }
    else if (enemy_in) {
        return (
            <button pos={toString(pos)} className={"square tile-" + toString(state & ((1 << 4) - 1))}>
                👾
            </button>
        )
    }
    else {
        return (
            <button pos={toString(pos)} className={"square tile-" + toString(state & ((1 << 4) - 1))}></button>
        )
    }
}