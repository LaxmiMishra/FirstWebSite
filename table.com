<!DOCTYPE html>
<html>
<head>
	<title>table</title>
	<style>
		table th td {
			border: 1px solid black;

		}
	</style>
</head>
<body>
<h1>Border table:</h1>
<table>
	<tr>
	  <th>First name</th>
	  <th>Last name</th>
	  <th>Salary</th>
	</tr>
	<tr>
		<td>Piyush</td>
		<td>Mishra</td>
		<td>80,000</td>
	</tr>
	<tr>
		<td>Vishal</td>
		<td>Mishra</td>
		<td>15,ooo</td>
	</tr>
	<tr>
		<td>Richa</td>
		<td>Mishra</td>
		<td>10,ooo</td>
	</tr>
	<tr>
		<td>Laxmi</td>
		<td>Mishra</td>
		<td>10,000</td>
	</tr>
</table>

</body>
</html>