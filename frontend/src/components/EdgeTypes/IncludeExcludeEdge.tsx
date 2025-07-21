import { Label } from '@radix-ui/react-label';
import {
    EdgeLabelRenderer,
    BaseEdge,
    type EdgeProps,
    type Edge,
    getStraightPath
} from '@xyflow/react'

export type IncludeExcludeEdge = Edge<
    {
      label: string;
    },
    'include_exclude_edge'
>

export default function IncludeExcludeEdge({id, sourceX, sourceY, targetX, targetY, data}:EdgeProps<IncludeExcludeEdge>){
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY
    })

    return (
        <>
            <BaseEdge id={id} path={edgePath} className="[stroke-dasharray:2,5]"/>
            <EdgeLabelRenderer>
                <Label 
                htmlFor={id}
                style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    pointerEvents: 'all',
                }}
                className="nodrag nopan"
                >{data?.label}</Label>
            </EdgeLabelRenderer>
        </>
    )
}