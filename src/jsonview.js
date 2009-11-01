var jsonview = {
	update: function() {
		var textarea = document.getElementById("json");
		var result = document.getElementById("result");
		result.innerHTML = "";
		try {
			var obj = eval("(" + textarea.value + ")");
			jsonview.dump(result, obj);
		} catch(e) {
			alert("Error:" + e.message);
		}
	},
	dump: function(parent, obj) {
		if(typeof(obj) == "object") {
			var table = jsonview.append(parent, "table");
			var tbody = jsonview.append(table, "tbody");
			for(var i in obj) {
				var tr = jsonview.append(tbody, "tr");
				if(!jsonview.isArray(obj)) {
					var tdName = jsonview.append(tr, "th");
					tdName.innerText = i;
				}
				var tdValue = jsonview.append(tr, "td");
				jsonview.dump(tdValue, obj[i]);
			}
		} else if(typeof(obj) == "string"){
			parent.innerHTML += '"' + obj + '"';
		} else if(typeof(obj) == "number") {
			parent.style.textAlign = "right";
			parent.innerHTML += obj;
		} else {
			parent.innerHTML += typeof(obj) + ":" + obj;
		}
	},
	isArray: function(array) {
		return !!(array && array.constructor &&
			array.constructor.toString().indexOf(" Array(") >= 0);
	},
	append: function(parent, name) {
		var newele = document.createElement(name);
		parent.appendChild(newele);
		return newele;
	}
};
