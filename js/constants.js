const PIECES = { OFF_BOARD: 'x', EMPTY: 'o', w_p: 'P', w_b: 'B', w_n: 'N', w_r: 'R', w_q: 'Q', w_k: 'K',
                b_p: 'p', b_b: 'b', b_n: 'n', b_r: 'r', b_q: 'q', b_k : 'k' };

const BLACK_PIECES = ['p', 'b', 'n', 'r', 'q', 'k'];

const WHITE_PIECES = ['P', 'B', 'N', 'R', 'Q', 'K'];

const DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// const DEFAULT_POSITION1 = 'rnbqkbnr/pppppppp/8/8/8/7p/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const NUM_OF_SQUARES = 120;

const FILES = { FILE_A: 0, FILE_B: 1, FILE_C: 2, FILE_D: 3, FILE_E: 4, FILE_F: 5, FILE_G: 6, FILE_H: 7, FILE_NONE: 8 };

const RANKS = { RANK_1: 0, RANK_2: 1, RANK_3: 2, RANK_4: 3, RANK_5: 4, RANK_6: 5, RANK_7: 6, RANK_8: 7, RANK_NONE: 8 };

const FILE_REPR = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const COLORS = { WHITE: 'w', BLACK: 'b', BOTH: 'both' };

const SQUARES = { A8: 21, B8: 22, C8: 23, D8: 24, E8: 25, F8: 26, G8: 27, H8: 28,
                A7: 31, B7: 32, C7: 33, D7: 34, E7: 35, F7: 36, G7: 37, H7: 38,
                A6: 41, B6: 42, C6: 43, D6: 44, E6: 45, F6: 46, G6: 47, H6: 48,
                A5: 51, B5: 52, C5: 53, D5: 54, E5: 55, F5: 56, G5: 57, H5: 58,
                A4: 61, B4: 62, C4: 63, D4: 64, E4: 65, F4: 66, G4: 67, H4: 68,
                A3: 71, B3: 72, C3: 73, D3: 74, E3: 75, F3: 76, G3: 77, H3: 78,
                A2: 81, B2: 82, C2: 83, D2: 84, E2: 85, F2: 86, G2: 87, H2: 88,
                A1: 91, B1: 92, C1: 93, D1: 94, E1: 95, F1: 96, G1: 97, H1: 98,
                };

const KING_MOVES = [-11, -10, -9, -1, 1, 9, 10, 11];

const KNIGHT_MOVES = [-21, -19, -12, -8, 8, 12, 19, 21];

const ROOK_MOVES = [-10, -1, 1, 10];

const BISHOP_MOVES = [-11, -9, 9, 11];

const QUEEN_MOVES = [-11, -10, -9, -1, 1, 9, 10, 11];

const WHITE_PAWN_ATTACKS = [-11, -9];

const BLACK_PAWN_ATTACKS = [9, 11];

const CASTLE_WHITE_KING_SIDE = [96, 97];

const CASTLE_WHITE_QUEEN_SIDE = [94, 93];

const CASTLE_BLACK_KING_SIDE = [26, 27];

const CASTLE_BLACK_QUEEN_SIDE = [24, 23];

const INFINITE = 1000000;

const CHECKMATE = 900000;

const MIRROR64 = [
    56	,	57	,	58	,	59	,	60	,	61	,	62	,	63	,
    48	,	49	,	50	,	51	,	52	,	53	,	54	,	55	,
    40	,	41	,	42	,	43	,	44	,	45	,	46	,	47	,
    32	,	33	,	34	,	35	,	36	,	37	,	38	,	39	,
    24	,	25	,	26	,	27	,	28	,	29	,	30	,	31	,
    16	,	17	,	18	,	19	,	20	,	21	,	22	,	23	,
    8	,	9	,	10	,	11	,	12	,	13	,	14	,	15	,
    0	,	1	,	2	,	3	,	4	,	5	,	6	,	7
    ];

const PAWN_TABLE = [
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	,
    10	,	10	,	0	,	-10	,	-10	,	0	,	10	,	10	,
    5	,	0	,	0	,	5	,	5	,	0	,	0	,	5	,
    0	,	0	,	10	,	20	,	20	,	10	,	0	,	0	,
    5	,	5	,	5	,	10	,	10	,	5	,	5	,	5	,
    10	,	10	,	10	,	20	,	20	,	10	,	10	,	10	,
    20	,	20	,	20	,	30	,	30	,	20	,	20	,	20	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	
    ];
    
    
const KNIGHT_TABLE = [
    0	,	-10	,	0	,	0	,	0	,	0	,	-10	,	0	,
    0	,	0	,	0	,	5	,	5	,	0	,	0	,	0	,
    0	,	0	,	10	,	10	,	10	,	10	,	0	,	0	,
    0	,	0	,	10	,	20	,	20	,	10	,	5	,	0	,
    5	,	10	,	15	,	20	,	20	,	15	,	10	,	5	,
    5	,	10	,	10	,	20	,	20	,	10	,	10	,	5	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0		
    ];
    
const BISHOP_TABLE = [
    0	,	0	,	-10	,	0	,	0	,	-10	,	0	,	0	,
    0	,	0	,	0	,	10	,	10	,	0	,	0	,	0	,
    0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
    0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
    0	,	10	,	15	,	20	,	20	,	15	,	10	,	0	,
    0	,	0	,	10	,	15	,	15	,	10	,	0	,	0	,
    0	,	0	,	0	,	10	,	10	,	0	,	0	,	0	,
    0	,	0	,	0	,	0	,	0	,	0	,	0	,	0	
    ];
    
const ROOK_TABLE = [
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0	,
    25	,	25	,	25	,	25	,	25	,	25	,	25	,	25	,
    0	,	0	,	5	,	10	,	10	,	5	,	0	,	0		
    ];