export default class StringModifier {

    //changes format from YYYY-MM-DD to YYYYMMDD
	formatDate = (str) => {
		return str.replace(/-/g, "");
	}
}