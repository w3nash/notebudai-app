// React Flow types for mind map
export type NodeData = {
  label: string;
  [key: string]: unknown;
};

export type NodePosition = {
  x: number;
  y: number;
};

export type NodeStyle = Record<string, string | number>;

export type Node = {
  id: string;
  type?: string;
  position: NodePosition;
  data: NodeData;
  style?: NodeStyle;
  className?: string;
  sourcePosition?: string;
  targetPosition?: string;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  parentNode?: string;
  zIndex?: number;
  extent?: "parent" | [number, number, number, number] | undefined;
  expandParent?: boolean;
  positionAbsolute?: NodePosition;
  width?: number;
  height?: number;
  [key: string]: unknown;
};

export type EdgeStyle = Record<string, string | number>;
export type EdgeLabelStyle = Record<string, string | number>;
export type EdgeBgStyle = Record<string, string | number>;
export type EdgeData = Record<string, unknown>;

export type Edge = {
  id: string;
  type?: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  label?: string;
  labelStyle?: EdgeLabelStyle;
  labelShowBg?: boolean;
  labelBgStyle?: EdgeBgStyle;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: EdgeStyle;
  animated?: boolean;
  hidden?: boolean;
  data?: EdgeData;
  className?: string;
  selected?: boolean;
  markerEnd?: string;
  markerStart?: string;
  zIndex?: number;
  [key: string]: unknown;
};

export type Viewport = {
  x: number;
  y: number;
  zoom: number;
};

export type MindMapData = {
  nodes: Node[];
  edges: Edge[];
  viewport?: Viewport;
};
