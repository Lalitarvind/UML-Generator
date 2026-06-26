import {
    EdgeLabelRenderer,
    BaseEdge,
    type EdgeProps,
    type Edge,
    getSmoothStepPath,
} from '@xyflow/react'

export type IncludeExcludeEdge = Edge<
    {
      label: string;
    },
    'include_exclude_edge'
>

export default function IncludeExcludeEdge({
    id, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, data, markerEnd, markerStart,
}: EdgeProps<IncludeExcludeEdge>) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
    })

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                markerStart={markerStart}
                style={{ strokeDasharray: '2 5' }}
            />
            <EdgeLabelRenderer>
                <label
                    htmlFor={id}
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        pointerEvents: 'all',
                        fontSize: '12px',
                    }}
                    className="nodrag nopan"
                >{data?.label}</label>
            </EdgeLabelRenderer>
        </>
    )
}
