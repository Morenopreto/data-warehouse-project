//   useEffect(() => {


//         infoCountries.filter((v, i, a) => a.findIndex(t => (t.region_name === v.region_name)) === i).forEach((x, v) => data2.push({
//             id: v,
//             name: x.region_name,
//             children: []
//         }))
//         data2.forEach((a, b) =>
//             infoCountries.filter((v, i, a) => a.findIndex(t => (t.country_name === v.country_name)) === i).forEach((y, v) => { if (a.name == y.region_name) { a.children.push({ id: v, name: y.country_name, children: [] }) } }))

//         data2.forEach((a, b) => a.children.forEach((c, d) => infoCountries.forEach((e, f) => { if (e.country_name == c.name) { c.children.push({ id: f, name: e.city_name }) } })))
//         console.log(data2)
//     }, [infoCountries])