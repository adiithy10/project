import { i as __toESM, t as require_react } from "./react-CZunmVaX.js";
import { J as clsx, K as generateUtilityClasses, ft as require_prop_types, q as generateUtilityClass, r as styled, t as useDefaultProps, x as composeClasses } from "./DefaultPropsProvider-Cu78-8ix.js";
import { t as require_jsx_runtime } from "./react_jsx-runtime.js";
import { t as memoTheme } from "./memoTheme-Dl9UblrA.js";
import { t as Tablelvl2Context } from "./Tablelvl2Context-B6In8KqX.js";
//#region node_modules/@mui/material/TableRow/tableRowClasses.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
function getTableRowUtilityClass(slot) {
	return generateUtilityClass("MuiTableRow", slot);
}
var tableRowClasses = generateUtilityClasses("MuiTableRow", [
	"root",
	"selected",
	"hover",
	"head",
	"footer"
]);
//#endregion
//#region node_modules/@mui/material/TableRow/TableRow.mjs
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses = (ownerState) => {
	const { classes, selected, hover, head, footer } = ownerState;
	return composeClasses({ root: [
		"root",
		selected && "selected",
		hover && "hover",
		head && "head",
		footer && "footer"
	] }, getTableRowUtilityClass, classes);
};
var TableRowRoot = styled("tr", {
	name: "MuiTableRow",
	slot: "Root",
	overridesResolver: (props, styles) => {
		const { ownerState } = props;
		return [
			styles.root,
			ownerState.head && styles.head,
			ownerState.footer && styles.footer
		];
	}
})(memoTheme(({ theme }) => ({
	color: "inherit",
	display: "table-row",
	verticalAlign: "middle",
	outline: 0,
	[`&.${tableRowClasses.hover}:hover`]: { backgroundColor: (theme.vars || theme).palette.action.hover },
	[`&.${tableRowClasses.selected}`]: {
		backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity),
		"&:hover": { backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`) }
	}
})));
var defaultComponent = "tr";
/**
* Will automatically set dynamic row height
* based on the material table element parent (head, body, etc).
*/
var TableRow = /*#__PURE__*/ import_react.forwardRef(function TableRow(inProps, ref) {
	const props = useDefaultProps({
		props: inProps,
		name: "MuiTableRow"
	});
	const { className, component = defaultComponent, hover = false, selected = false, ...other } = props;
	const tablelvl2 = import_react.useContext(Tablelvl2Context);
	const ownerState = {
		...props,
		component,
		hover,
		selected,
		head: tablelvl2 && tablelvl2.variant === "head",
		footer: tablelvl2 && tablelvl2.variant === "footer"
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TableRowRoot, {
		as: component,
		ref,
		className: clsx(useUtilityClasses(ownerState).root, className),
		role: component === defaultComponent ? null : "row",
		ownerState,
		...other
	});
});
TableRow.propTypes = {
	/**
	* Should be valid `<tr>` children such as `TableCell`.
	*/
	children: import_prop_types.default.node,
	/**
	* Override or extend the styles applied to the component.
	*/
	classes: import_prop_types.default.object,
	/**
	* @ignore
	*/
	className: import_prop_types.default.string,
	/**
	* The component used for the root node.
	* Either a string to use a HTML element or a component.
	*/
	component: import_prop_types.default.elementType,
	/**
	* If `true`, the table row will shade on hover.
	* @default false
	*/
	hover: import_prop_types.default.bool,
	/**
	* If `true`, the table row will have the selected shading.
	* @default false
	*/
	selected: import_prop_types.default.bool,
	/**
	* The system prop that allows defining system overrides as well as additional CSS styles.
	*/
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
//#endregion
export { getTableRowUtilityClass as n, tableRowClasses as r, TableRow as t };

//# sourceMappingURL=TableRow-C1J4ID5U.js.map