
/*var x=setInterval(timekeeper,1000);
		function timekeeper()
		{
			var d = new Date();
			var weekday = new Array(7);
		weekday[0] = "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";

 
			document.getElementById("tim").innerHTML=d.toLocaleTimeString();
			document.getElementById("day").innerHTML=weekday[d.getDay()];



		}
*/
function verify(form)
{
	
	if(form.candidateid.value=="")
	{
		alert("ID is required");
		return false;
	}
	if(form.password.value=="")
	{
		alert("password is required");
		return false;
	}
	return true;

} 