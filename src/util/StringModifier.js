export default class StringModifier {

    //changes format from YYYY-MM-DD to YYYYMMDD
	formatFilteredDate = (str) => {
		return str.replace(/-/g, "");
	}
}