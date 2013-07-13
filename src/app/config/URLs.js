/*
 * 
 */
define([
	"dojo/_base/declare"
	],
	function(declare){
	
	return declare([], {
			
			init:function(){
				
				
				this.WEBSOCKET = dojo.config.drivercheck.websocket_host + "emanda2/websocket";
				this.LOGIN = dojo.config.drivercheck.auth_host + "emanda2/_auth";
				
				this.LANGUAGE = dojo.config.drivercheck.api_host + "emanda2/language";

				this.PROGRESS = dojo.config.drivercheck.api_host + "emanda2/_progress";
				this.SCHEMA = dojo.config.drivercheck.api_host + "emanda2/_schema";
				this.ORGANIZATION = dojo.config.drivercheck.api_host + "emanda2/org";
				this.COMPANY = dojo.config.drivercheck.api_host + "emanda2/company";
				this.SITE = dojo.config.drivercheck.api_host + "emanda2/site";
				this.SITE_SEARCH = dojo.config.drivercheck.api_host + "emanda2/_site_search";
				this.LAB = dojo.config.drivercheck.api_host + "emanda2/lab";
				this.KIT = dojo.config.drivercheck.api_host + "emanda2/kit";
				this.FORM = dojo.config.drivercheck.api_host + "emanda2/form";
				this.FORM_TYPE = dojo.config.drivercheck.api_host + "emanda2/form_type";
				this.DONOR = dojo.config.drivercheck.api_host + "emanda2/donor";
				this.COLLECTOR = dojo.config.drivercheck.api_host + "emanda2/collector";
				this.CONTACT = dojo.config.drivercheck.api_host + "emanda2/contact";
				this.MRO = dojo.config.drivercheck.api_host + "emanda2/mro";
				this.USER = dojo.config.drivercheck.api_host + "emanda2/user";
				this.HOMEBASE = dojo.config.drivercheck.api_host + "emanda2/org?_direct_only=true&homebase=true";
				this.COMPANY_SERVICE = dojo.config.drivercheck.api_host + "emanda2/company_service";
				this.SITE_SERVICE = dojo.config.drivercheck.api_host + "emanda2/site_service";
				this.SITE_PRIORITY = dojo.config.drivercheck.api_host + "emanda2/site_priority";
				this.SITE_CATEGORY = dojo.config.drivercheck.api_host + "emanda2/site_category";
				this.SERVICE = dojo.config.drivercheck.api_host + "emanda2/service";
				this.OPEN_RANGE = dojo.config.drivercheck.api_host + "emanda2/open_range";
				this.ORDER = dojo.config.drivercheck.api_host + "emanda2/order";
				this.REASON = dojo.config.drivercheck.api_host + "emanda2/reason";
				this.SAMPLE_TYPE = dojo.config.drivercheck.api_host + "emanda2/sample_type";
				this.AMOUNT_TYPE = dojo.config.drivercheck.api_host + "emanda2/amount_type";
				this.TEST = dojo.config.drivercheck.api_host + "emanda2/test";
				this.TEST_EVENT = dojo.config.drivercheck.api_host + "emanda2/test_event";
				this.SUBTEST_TYPE = dojo.config.drivercheck.api_host + "emanda2/subtest_type";
				this.BATTERY = dojo.config.drivercheck.api_host + "emanda2/battery";
				this.DISPOSITION = dojo.config.drivercheck.api_host + "emanda2/disposition";
				this.STATUS = dojo.config.drivercheck.api_host + "emanda2/status";
				this.STATUS_CATEGORY = dojo.config.drivercheck.api_host + "emanda2/status_category";
				this.TEST_TEMPLATE = dojo.config.drivercheck.api_host + "emanda2/test_template";
				this.RANDOM_PROGRAM = dojo.config.drivercheck.api_host + "emanda2/rnd_program";
				this.RANDOM_SELECTION = dojo.config.drivercheck.api_host + "emanda2/rnd_sel";
				this.RANDOM_SELECTION_MEMBER = dojo.config.drivercheck.api_host + "emanda2/rnd_sel_member";
				this.DOT_TYPE = dojo.config.drivercheck.api_host + "emanda2/dot_type";
				this.RANDOM_SELECTION_TYPE = dojo.config.drivercheck.api_host + "emanda2/sel_type";
				this.RANDOM_TARGET_TYPE = dojo.config.drivercheck.api_host + "emanda2/target_type";
				this.FREQUENCY = dojo.config.drivercheck.api_host + "emanda2/frequency";
				this.COMPANY_GROUP = dojo.config.drivercheck.api_host + "emanda2/company_group";
				this.GROUPS_OF_COMPANY = dojo.config.drivercheck.api_host + "emanda2/_co_group_search"; // finds the groups a company belongs to
				this.DONOR_GROUP = dojo.config.drivercheck.api_host + "emanda2/donor_group";
				this.COMPANY_GROUP_TYPE = dojo.config.drivercheck.api_host + "emanda2/group_type";											
				this.RANDOM_POOL = dojo.config.drivercheck.api_host + "emanda2/rnd_sel?progress.id=READY";
				this.RANDOM_SELECTION_RUNNING = dojo.config.drivercheck.api_host + "emanda2/rnd_sel?progress.id=IN_PROGRESS";
				this.DOCUMENT = dojo.config.drivercheck.api_host + "emanda2/doc";											
				this.BILLING_ACCOUNT = dojo.config.drivercheck.api_host + "emanda2/billing_account";
				this.PAYMENT_TERMS = dojo.config.drivercheck.api_host + "emanda2/payment_terms";
				this.PAYMENT_TYPE = dojo.config.drivercheck.api_host + "emanda2/payment_type";
				this.GL_ACCOUNT = dojo.config.drivercheck.api_host + "emanda2/gl_account";
				this.GL_TABLE = dojo.config.drivercheck.api_host + "emanda2/gl_table";
				this.BUNDLE_DISCOUNT = dojo.config.drivercheck.api_host + "emanda2/bundle_discount";
				this.INHOUSE_REBATE = dojo.config.drivercheck.api_host + "emanda2/in_house_rebate_entry";
				this.MRO_UNIT_FEE = dojo.config.drivercheck.api_host + "emanda2/mro_unit_fee_entry";
        		this.FEE_SCHEDULE = dojo.config.drivercheck.api_host + "emanda2/fee_schedule";
        		this.FEE_CATEGORY = dojo.config.drivercheck.api_host + "emanda2/fee_category";
        		this.FEE_SOURCE = dojo.config.drivercheck.api_host + "emanda2/fee_source";
        		this.FEE_CATEGORY_UNUSED = dojo.config.drivercheck.api_host + "emanda2/fee_schedule/unusedFeeCategories";
				this.DOCUMENT_TYPE = dojo.config.drivercheck.api_host + "emanda2/doc_type";								
				this.DOCUMENT_CLASS = dojo.config.drivercheck.api_host + "emanda2/doc_class";								
				this.RESPONSIBILITY = dojo.config.drivercheck.api_host + "emanda2/responsibility";								
				this.DOCUMENT_PROGRESS = dojo.config.drivercheck.api_host + "emanda2/doc_progress";								
				this.TEST_PROGRESS = dojo.config.drivercheck.api_host + "emanda2/progress";								
				this.ACTIVITY = dojo.config.drivercheck.api_host + "emanda2/activity";											
				this.ACTIVITY_TYPE = dojo.config.drivercheck.api_host + "emanda2/activity_type";
				//this.ENTITY_CURSOR = dojo.config.drivercheck.api_host + "emanda2/_nav"; // Deprecated
				this.ROLE = dojo.config.drivercheck.api_host + "emanda2/role";
				this.PERM = dojo.config.drivercheck.api_host + "emanda2/perm";
				this.COLLECTION_TYPE = dojo.config.drivercheck.api_host + "emanda2/collection_type";
				this.LAB_RESULTS = dojo.config.drivercheck.api_host + "emanda2/lab_result";
				this.LAB_RESULT_PROGRESS = dojo.config.drivercheck.api_host + "emanda2/lab_result_progress";
				this.SUBSTANCE = dojo.config.drivercheck.api_host + "emanda2/substance";
				this.TEST_LINE_ITEM_TEMPLATE = dojo.config.drivercheck.api_host + "emanda2/test_line_item_template";
				this.CHARGE_LINE_ITEM_TEMPLATE = dojo.config.drivercheck.api_host + "emanda2/charge_line_item_template";
				this.INVOICE = dojo.config.drivercheck.api_host + "emanda2/invoice";
				this.CHARGE = dojo.config.drivercheck.api_host + "emanda2/charge";
				this.CHARGE_TYPE = dojo.config.drivercheck.api_host + "emanda2/charge_type";
				this.MODULE = dojo.config.drivercheck.api_host + "emanda2/module";

				this.INVOICE = dojo.config.drivercheck.api_host + "emanda2/invoice";
				this.INVOICE_CLASS = dojo.config.drivercheck.api_host + "emanda2/invoice_class";
				this.INVOICE_GROUPING = dojo.config.drivercheck.api_host + "emanda2/invoice_grouping";
				this.INVOICE_ITEM_ORDER = dojo.config.drivercheck.api_host + "emanda2/invoice_item_order";

				this.CURRENCY = dojo.config.drivercheck.api_host + "emanda2/currency";
				this.BILLING_METHOD = dojo.config.drivercheck.api_host + "emanda2/billing_method";
				this.RECONCILIATION = dojo.config.drivercheck.api_host + "emanda2/_reconciliation_search";
				this.CALCULATE_PREPAYMENT = dojo.config.drivercheck.api_host + "emanda2/_prepayment_calc";
				this.GLOBAL_SETTING = dojo.config.drivercheck.api_host + "emanda2/global_setting";
				this.TAX_RATE = dojo.config.drivercheck.api_host + "emanda2/tax_rate";
				this.BILLING_RUN = dojo.config.drivercheck.api_host + "emanda2/billing_run";
				this.model = {
					links:{
						list:{
							company: dojo.config.drivercheck.client_host + "#companies/list",
							donor: dojo.config.drivercheck.client_host + "#donors/list",
							test: dojo.config.drivercheck.client_host + "#tests/list",
							doc: dojo.config.drivercheck.client_host + "#documents/list",
							role: dojo.config.drivercheck.client_host + "#roles/list/",
							test: dojo.config.drivercheck.client_host + "#tests/list/",
							order: dojo.config.drivercheck.client_host + "#booking/list/",
							fee_schedule: dojo.config.drivercheck.client_host + "##billing/fee-schedules/",
							lab_result: dojo.config.drivercheck.client_host + "#lab-results/list"
						},
						editor:{
							company: dojo.config.drivercheck.client_host + "#companies/dialogsetup/",
							donor: dojo.config.drivercheck.client_host + "#donors/dialogsetup/",
							test: dojo.config.drivercheck.client_host + "#tests/dialogsetup/",
							doc: dojo.config.drivercheck.client_host + "#documents/view/{id}/page1",
							role: dojo.config.drivercheck.client_host + "#roles/dialogsetup/",
							test: dojo.config.drivercheck.client_host + "#tests/dialogsetup/",
							order: dojo.config.drivercheck.client_host + "#booking/dialogsetup/",
							fee_schedule: dojo.config.drivercheck.client_host + "##billing/fee-details/{id}/fee entries",
							lab_result: dojo.config.drivercheck.client_host + "#lab-results/dialogsetup"
						}					
					},

					modules:{
						editor:{
							company: {url:"app/modules/companies/CompanySetup", width:"800px", height:"620px"},
							donor: {url:"app/modules/donors/DonorSetup", width:"500px", height:"400px"},
							test: {url:"app/modules/tests/TestSetup", width:"800px", height:"620px"},
							role: {url:"app/modules/roles/RoleSetup", width:"800px", height:"620px"},
							test: {url:"app/modules/tests/TestSetup", width:"800px", height:"620px"},
							order: {url:"app/modules/booking/BookingSetup", width:"800px", height:"620px"},
							fee_schedule: {url:"app/modules/billing/FeeScheduleSetup", width:"800px", height:"620px"},
							lab_result: {url:"app/modules/labResults/LabResultsViewer", width:"800px", height:"620px"}
						}

					}
				}

		}
			
	});
});
