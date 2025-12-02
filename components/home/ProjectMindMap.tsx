'use client';

import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
    Position,
    Handle,
    NodeProps,
    Edge,
    Node,
    ReactFlowProvider,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useRouter } from 'next/navigation';
import { projects } from '../../data/projects';
import { useTheme } from 'next-themes';

// 1. 커스텀 노드 디자인 (Handle을 중앙으로 이동)
const CustomNode = ({ data }: NodeProps) => {
    // 노드 타입별 스타일 정의
    const getStyle = () => {
        switch (data.type) {
            case 'root':
                // 중앙 노드: 큼직하고 강조됨
                return 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-4 border-blue-200 shadow-2xl rounded-full w-32 h-32 flex flex-col items-center justify-center z-50 animate-pulse-slow';
            case 'category':
                // 카테고리 노드: 중간 크기 원형
                return 'bg-slate-800 text-white border-2 border-slate-600 shadow-xl rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold text-sm z-40 transition-transform hover:scale-110';
            case 'project':
                // 프로젝트 노드: 둥근 사각형 카드
                return 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl hover:border-blue-400 hover:scale-105 transition-all rounded-xl px-4 py-2 text-xs font-medium max-w-[180px] text-center z-30 break-keep';
            default:
                return '';
        }
    };

    return (
        <div className={`${getStyle()} relative flex items-center justify-center`}>
            {/* [핵심 수정] Target Handle (받는 점) 
        - left: 50%, top: 50% 로 설정하여 노드 정중앙에 위치시킴
        - 노드 뒤에 숨겨져서 선이 중심을 향하는 것처럼 보임
      */}
            <Handle
                type="target"
                position={Position.Top}
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0 }}
            />

            {/* 노드 내용 */}
            <div className="flex flex-col items-center gap-1 pointer-events-none">
                {data.icon && <span className="text-2xl">{data.icon}</span>}
                <span>{data.label}</span>
            </div>

            {/* [핵심 수정] Source Handle (보내는 점)
        - 마찬가지로 정중앙에 위치
      */}
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0 }}
            />
        </div>
    );
};

const nodeTypes = {
    custom: CustomNode,
};

// 2. 방사형 레이아웃 계산 함수
const getRadialLayout = () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // 설정값 (반지름 조절로 간격 확보)
    const CENTER_X = 0;
    const CENTER_Y = 0;
    const CAT_RADIUS = 250; // 카테고리 원 반지름
    const PROJ_RADIUS = 500; // 프로젝트 원 반지름

    // (1) Root Node (중앙)
    nodes.push({
        id: 'root',
        type: 'custom',
        data: { label: 'MH.Lee', type: 'root', icon: '🚀' },
        position: { x: CENTER_X - 64, y: CENTER_Y - 64 }, // w-32(128px)의 절반 보정
    });

    // (2) Categories & Projects
    const categories = Array.from(new Set(projects.map((p) => p.category)));
    const angleStep = (2 * Math.PI) / categories.length;

    const catIcons: Record<string, string> = {
        Engineering: '⚙️',
        Research: '🔬',
        Service: '📱',
        GenAI: '🤖',
    };

    categories.forEach((cat, idx) => {
        // 카테고리 위치 계산
        const angle = idx * angleStep;
        const catX = CENTER_X + CAT_RADIUS * Math.cos(angle);
        const catY = CENTER_Y + CAT_RADIUS * Math.sin(angle);
        const catId = `cat-${cat}`;

        nodes.push({
            id: catId,
            type: 'custom',
            data: { label: cat, type: 'category', icon: catIcons[cat] || '📂' },
            position: { x: catX - 48, y: catY - 48 }, // w-24(96px)의 절반 보정
        });

        edges.push({
            id: `e-root-${catId}`,
            source: 'root',
            target: catId,
            style: { stroke: '#94a3b8', strokeWidth: 2, opacity: 0.5 },
            type: 'straight', // 직선 (중앙을 향해 뻗음)
        });

        // 해당 카테고리의 프로젝트들 배치 (부채꼴 펼침)
        const catProjects = projects.filter((p) => p.category === cat);
        const projCount = catProjects.length;

        // 카테고리 주변으로 펼쳐질 각도 범위 (약 60도)
        const sectorAngle = Math.PI / 3;
        const startProjAngle = angle - sectorAngle / 2;
        const projAngleStep = sectorAngle / (projCount + 1);

        catProjects.forEach((p, pIdx) => {
            const projAngle = startProjAngle + (pIdx + 1) * projAngleStep;
            const projX = CENTER_X + PROJ_RADIUS * Math.cos(projAngle);
            const projY = CENTER_Y + PROJ_RADIUS * Math.sin(projAngle);

            nodes.push({
                id: p.id,
                type: 'custom',
                data: { label: p.title, type: 'project' },
                position: { x: projX - 90, y: projY - 25 }, // 카드 크기 절반 보정
            });

            edges.push({
                id: `e-${catId}-${p.id}`,
                source: catId,
                target: p.id,
                style: { stroke: '#cbd5e1', strokeWidth: 1.5 },
                type: 'straight', // 직선
            });
        });
    });

    return { nodes, edges };
};

function MindMapContent() {
    const router = useRouter();
    const { theme } = useTheme();
    const { fitView } = useReactFlow();

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getRadialLayout();
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        // 초기 로딩 시 중앙 정렬 및 줌 아웃
        setTimeout(() => {
            fitView({ padding: 0.1, duration: 800 });
        }, 100);
    }, [fitView, setNodes, setEdges]);

    const onNodeClick = useCallback((event: any, node: Node) => {
        if (node.data.type === 'project') {
            router.push(`/projects/${node.id}`);
        }
    }, [router]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-right"
            className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
            minZoom={0.1}
            maxZoom={1.5}
            panOnDrag={true}
            zoomOnScroll={true}
        >
            <Background color={theme === 'dark' ? '#334155' : '#cbd5e1'} gap={30} size={1} />
            <Controls className="dark:bg-slate-800 dark:text-white dark:border-slate-700" />
        </ReactFlow>
    );
}

export default function ProjectMindMap() {
    return (
        <div className="w-full h-[700px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-inner relative">
            <div className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full text-xs text-slate-500 border border-slate-200 dark:border-slate-700 pointer-events-none">
                Scroll to zoom • Drag nodes
            </div>
            <ReactFlowProvider>
                <MindMapContent />
            </ReactFlowProvider>
        </div>
    );
}