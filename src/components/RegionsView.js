
import React, { useCallback, useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserTableContext } from '../context/userTableContext'
import Tree, {
    useTreeState,
    treeHandlers,
} from 'react-hyper-tree';
import './css/tree.css'

const RegionsView = () => {
    let data2 = []
    const [dataTree, setDataTree] = useState([]);
    const [displayPlegable, setDisplayPlegable] = useState(false);
    const { infoCountries } = useContext(UserTableContext)

    const { required, handlers } = useTreeState({
        id: 'tree',
        data: dataTree,
        defaultOpened: false,
        multipleSelect: false,
    })



    useEffect(() => {

        infoCountries.filter((v, i, a) => a.findIndex(t => (t.region_name === v.region_name)) === i).forEach((x, v) => data2.push({
            id: v,
            name: x.region_name,
            children: []
        }))
        data2.forEach((a, b) =>
            infoCountries.filter((v, i, a) => a.findIndex(t => (t.country_name === v.country_name)) === i).forEach((y, v) => { if (a.name == y.region_name) { a.children.push({ id: v, name: y.country_name, children: [] }) } }))

        data2.forEach((a, b) => a.children.forEach((c, d) => infoCountries.forEach((e, f) => { if (e.country_name == c.name) { c.children.push({ id: f, name: e.city_name }) } })))
        console.log(data2)
        setDataTree(data2)
    }, [infoCountries])


    const renderNode = useCallback(({
        node,
        onToggle,
    }) => (
        <div className="tree-node" key={node.data.title} onClick={onToggle}
        >
            <div
                onClick={onToggle}
                className={'tree-icon'}
            />
            <div
                className={
                    'node-content-wrapper'
                }
                onClick={
                    () => treeHandlers.trees.tree.handlers.setSelected(
                        node,
                        !node.isSelected(),
                    )
                }
            >
                <div className="titles">
                    <div className="node-title">
                        {node.data.name}
                    </div>
                    {/* {node.data.title && (
                        <div className="node-subtitle">
                            {node.data.title}
                        </div>
                    )} */}
                </div>
                {!!node.options.childrenCount && (
                    <div className="children-length">
                        <div>{node.options.childrenCount}</div>
                    </div>
                )}
            </div>
        </div>
    ), [])



    return (
        <section className='regions-sect'>
            <h1>Regiones</h1>
            <div className='userComp-div'>
                <div className='plegable-button-ctn' onMouseEnter={()=>setDisplayPlegable(true) } onMouseLeave={()=>setDisplayPlegable(false) }>
                    <span className='generic-button-plegable' to={{ pathname: `/regions/addNewRegion` }}> Agregar </span>
                    <NavLink className={`plegable-button ${(displayPlegable)?'showPlegable':'hidePlegable'}`} to={{ pathname: `/regions/addNew` }}> Region </NavLink>
                    <NavLink className={`plegable-button ${(displayPlegable)?'showPlegable':'hidePlegable'}`} to={{ pathname: `/regions/addNew` }}> Pais </NavLink>
                    <NavLink className={`plegable-button ${(displayPlegable)?'showPlegable':'hidePlegable'}`} to={{ pathname: `/regions/addNew` }}> Ciudad </NavLink>
                </div>
            </div>
            <Tree
                {...required}
                {...handlers}

                draggable={true}
                depthGap={12}
                disableLines={true}
                renderNode={renderNode}
            />
        </section>
    )
}

export default RegionsView;

