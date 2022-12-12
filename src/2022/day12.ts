import { fromMatrixKey, matrixKey, range, toMatrix } from '../util';
import '../array';
import { dijkstra, Edge, findShortestPath, IGraphAdapter, NodeKey } from '../dijkstra';

export type GraphType = Record<string, Record<string, number>>;

export class GraphAdapter implements IGraphAdapter<string> {
  graph: GraphType;

  constructor(graph: GraphType) {
    this.graph = graph;
  }

  getEdges(n: string): Edge<string>[] {
    return Object.entries(this.graph[n]).map(([key, value]) => ({
      node: key,
      weight: 1,
    }));
  }
}

export function run() {
  const graph: GraphType = {};
  const map = toMatrix<string>(realInput, (s) => s);
  const startNode = map.toArray().find(([key, value]) => value === 'S')![0];
  const finishNode = map.toArray().find(([key, value]) => value === 'E')![0];
  map.forEach((s, key) => {
    const height = getHeight(s);
    const [row, col] = fromMatrixKey(key);
    const neighbours = [
      [row, col + 1],
      [row, col - 1],
      [row + 1, col],
      [row - 1, col],
    ] as const;
    const edges = neighbours
      .map(([row, col]) => ({ row, col, val: map.get(row, col) }))
      .filter(({ val }) => val && getHeight(val) - height <= 1);
    graph[key] = Object.fromEntries(edges.map((e) => [matrixKey(e.row, e.col), 1]));
  });
  const graphAdapter = new GraphAdapter(graph);
  const { costs } = dijkstra(graphAdapter, startNode, finishNode);
  console.log('Part 1', costs[finishNode]);

  const startNodes = map.toArray().filter(([key, value]) => value === 'a');
  const possiblePaths = startNodes.map(([key]) => key).map((startNode) => dijkstra(graphAdapter, startNode, finishNode).costs[finishNode]);
  console.log('Part 2', possiblePaths.filter(Boolean).sortAsc().slice(0, 1));
}

const getHeight = (s: string) => (s === 'S' ? 0 : s === 'E' ? 26 : s.charCodeAt(0) - 97);

const testInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const realInput = `abaccccccccccccccaaaccccaaaaaaaaaaaaaccccccaacccccccccccccccccccccccccccccaaaaaa
abaaccaacccccccccaaaaaccccaaaaaaaaaaaaaccccaaacccccccccccccccccccccccccccccaaaaa
abaaccaaacccccccaaaaaacccaaaaaaaaaaaaaacaaaaaaaaccccccccaacccccccccccccccccccaaa
abcaaaaaaaacccccaaaaaacccaaaaaaaaaaaaaacaaaaaaaacccccccaaaacccccccccccccccccaaaa
abcaaaaaaaaccccccaaaaaccaaaaaaaaccaaaaaccaaaaaaccccccccaaaaccaaaccccccccccccaaac
abccaaaaaacccccccaaaaccaaaaaaaaaacaaaacccaaaaaacccccccccakkaaaaaacccccccccccaacc
abccaaaaaacccccccccccccaaaaaaaaaaccccccccaaaaaaccccccckkkkkkkaaacccccccccccccccc
abccaaaaaaccccccccccccccccaaaaaaaaaccccccaacaaacccccckkkkkkkkkaccccccaccaaaccccc
abccaacaaacccccaaccccccccaaacacaaaacaaccccccccccccccakkkoppkkkkicccccaaaaaaccccc
abccccccccccccaaaccccccccaacccccaaaaaaccccccccccccccjkkooppppkiicccccccaaaaccccc
abccccccccccaaaaaaaaccccccccccaaaaaaaccccccccccccccjjjooopppppiiiicccccccaaacccc
abaaacccccccaaaaaaaacccccccaacaaaaaaccccccccccccccjjjjooouuppppiiiiiicccccaacccc
abaaaccccccccaaaaaaccccccccaaaccaaaaacccccccccccjjjjjooouuuupppiiiiiiiiccccacccc
abaaaaaacccccaaaaaacccccaaaaaaaaaacaaaccccccccjjjjjjooouuuuuupppppiiiiiicccccccc
abaaaaaacccccaaaaaacccccaaaaaaaaaacccccccccccjjjjjooooouuxxuupppppqqqijjjccccccc
abaaaacccccaaaaccaaccccccaaaaaaccccccccccccciijjnooooouuuxxxuuupqqqqqqjjjdddcccc
abaaaaaccaaaaaaccacccccccaaaaaaccccccccccaaiiiinnootttuuxxxxuuvvvvvqqqjjjdddcccc
abaaaaaccaaaaaacaaaccaaccaaaaaaccccccccccaaiiinnnntttttuxxxxxvvvvvvqqqjjjdddcccc
abaaccacccaaaaacaaaaaaaccaaccaaccccccccccaaiiinnnttttxxxxxxxyyyyyvvqqqjjjdddcccc
abcccccccaaaaacccaaaaaaccccccaaaaacccccccaaiiinnntttxxxxxxxyyyyyvvvqqqjjjddccccc
SbcccccccaaaaacaaaaaaaaccccccaaaaaccccccccciiinnntttxxxEzzzzyyyyvvqqqjjjdddccccc
abcccccccccccccaaaaaaaaaccccaaaaaaccccccccciiinnnntttxxxxyyyyyvvvvqqjjjdddcccccc
abcccccccccccccaaaaaaaaaacccaaaaaacccccccccciiinnnttttxxxyyyyyvvvqqqjjjdddcccccc
abccccccccccccccccaaaaaaacccaaaaaaccccccccccciiinnnntttwyyywyyyvvrrrkkjdddcccccc
abcccccccccccccccaaaaaaaaccccaaaccccccccccccciiihnnnttwwwywwyyywvrrrkkkeeccccccc
abcccccccccccccccaaaaaaaaccccccccccccccccccccchhhmmmsswwwwwwwwwwwvrrkkkeeccccccc
abcccccccaacccccccacaaacccccccccccccccccccaacchhhhmmsswwwwwswwwwwrrrkkkeeccccccc
abcccccccaaaccacccccaaacccccccccccccccaaccaaccchhhmmssswwwssrrwwwrrrkkkeeccccccc
abcccccccaaaaaaacccccccccccaaaccccccccaaaaaaccchhhmmssssssssrrrrrrrrkkkeeaaacccc
abcccccaaaaaaaaccccccccccccaaaaccccccccaaaaaaachhhmmmssssssllrrrrrrkkkeeeaaacccc
abccccaaaaaaaaaccccccccccccaaaacccccccccaaaaacchhhmmmmsssllllllllkkkkkeeeaaacccc
abccccaaaaaaaaaccccccccccccaaacccccccccaaaaacccchhhmmmmmlllllllllkkkkeeeeaaccccc
abcccccccaaaaaaccccccccccaacccccccaaccaaacaacccchhhmmmmmlllgfflllkkffeeeaaaacccc
abccccccaaaaaaaccccccccccaaaaaaaaaaaaaccccaacccchhhggmmmggggffffffffffeaaaaacccc
abccaacccaacccaaaaccaccccaaaaaaaaaaaaacccccccccccgggggggggggffffffffffaacccccccc
abaaaaccaaaccccaaaaaaccccaaaaaacaaaaaaccccccccccccgggggggggaaaaccffccccccccccccc
abaaaacccccccccaaaaaaccaaaaaaaaaaaaaacccccccccccccccgggaaaaaaaacccccccccccccccca
abaaaaacccccccaaaaaaaccaaaaaaaaaaaaaacccccccccccccccccaaacccaaaaccccccccccccccaa
abaaaaacaaaaccaaaaaaaacaaaaaaaaaaaccccccccccccccccccccaaaccccaaaccccccccccaaacaa
abaaaaacaaaaccaaaaaaaaaaaaaaaaaaacccccccccccccccccccccccccccccccccccccccccaaaaaa
abaaacccaaaaccccaaaccccaaaaaaaaaaacccccccccccccccccccccccccccccccccccccccccaaaaa`;
