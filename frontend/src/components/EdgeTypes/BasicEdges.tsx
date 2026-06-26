import { getSmoothStepPath, BaseEdge, type EdgeProps, type Edge } from '@xyflow/react';

export type SolidLineEdge = Edge<Record<string, never>, 'solidLineEdge'>;
export function SolidLineEdge({
    id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, markerEnd, markerStart,
}: EdgeProps) {
    const [path] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
    return <BaseEdge id={id} path={path} markerEnd={markerEnd} markerStart={markerStart} />;
}

export type SolidArrowEdge = Edge<Record<string, never>, 'solidArrowEdge'>;
export function SolidArrowEdge({
    id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, markerEnd, markerStart,
}: EdgeProps) {
    const [path] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
    return <BaseEdge id={id} path={path} markerEnd={markerEnd} markerStart={markerStart} />;
}

export type DashedLineEdge = Edge<Record<string, never>, 'dashedLineEdge'>;
export function DashedLineEdge({
    id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, markerEnd, markerStart,
}: EdgeProps) {
    const [path] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
    return (
        <BaseEdge
            id={id}
            path={path}
            markerEnd={markerEnd}
            markerStart={markerStart}
            style={{ strokeDasharray: '6 4' }}
        />
    );
}

export type DashedArrowEdge = Edge<Record<string, never>, 'dashedArrowEdge'>;
export function DashedArrowEdge({
    id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, markerEnd, markerStart,
}: EdgeProps) {
    const [path] = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
    return (
        <BaseEdge
            id={id}
            path={path}
            markerEnd={markerEnd}
            markerStart={markerStart}
            style={{ strokeDasharray: '6 4' }}
        />
    );
}
