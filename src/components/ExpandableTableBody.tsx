import React, { useState } from 'react'

interface IExpandableTableBodyProps{
    isExpandable?: boolean
    isExpanded?: boolean
}

export const ExpandableTableBody : React.FunctionComponent<IExpandableTableBodyProps> = (props) => {
    let [isExpanded, setExpandedState] = useState(props.isExpanded ? true : false)

    const _toggleRowVisibility = () : void => {
        if (props.isExpandable === false){
            return
        }
        setExpandedState(!isExpanded)
    }

    return (
        <tbody>
            {React.cloneElement(React.Children.toArray(props.children)[0] as React.ReactElement, { onClick: _toggleRowVisibility })}
            {isExpanded && ( 
                React.Children.toArray(props.children).slice(1)
            )}
        </tbody>
    )
}

export default ExpandableTableBody