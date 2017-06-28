<div class="layer">
	<div>This is <%= name %> layer</div>
	遍历:
	<br/>
	<% for (var i=0,ilen=arr.length; i<ilen; i++) { %>
		<%= arr[i] %>
	<% } %>
	<br/>
	<img src="${ require('../../assets/bg.jpg') }" width="50"/>
</div>