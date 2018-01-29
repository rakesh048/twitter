$(function() {
    var date=new Date();


    $('#data_date2 .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            calendarWeeks: true,
            format: 'yyyy-mm-dd',
            autoclose: true,
            startDate:'-1m',
            endDate: date,
    });
 
   
 });

