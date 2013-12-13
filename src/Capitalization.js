/**
 * Adds links to fix the capitalization of labels on Wikidata 
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/Capitalization.js]] ([[File:User:Helder.wiki/Tools/Capitalization.js]])
 */
/*jshint browser: true, camelcase: true, curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, trailing: true, maxlen: 120, evil: true, onevar: true */
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';

	var i18nData = {
		'en': {
			'link-lower-case-first': 'LCFirst',
			'link-lower-case-first-description': 'Converts the first character to lower case',
		}
	};
	mw.messages.set( $.extend( i18nData.en, i18nData[ mw.config.get( 'wgUserLanguage' ) ] ) );
 
	/**
	 * Create the links
	 */
	function init() {
		var $links = $( '.wb-terms .wikibase-toolbareditgroup-editbutton' );
 
		$links.each( function(){
			var $link = $(this),
				$parent = $link.parent(),
				$clone = $parent.clone();
			$clone
				.find( 'a' )
					.text( mw.msg( 'link-lower-case-first' ) )
					.attr( {
						href: '#',
						title: mw.msg( 'link-lower-case-first-description' )
					} )
					.click( function( e ){
						var $input, val;
						e.preventDefault();
						$link.click();
						$input = $( ':focus' );
						val = $input.val();
						$input.attr( 'value', val.charAt(0).toLowerCase() + val.slice(1) );
						$( '.wb-ui-propertyedittool-editablevalueinterface input' )
							.trigger( 'input' );
					} )
					.end()
				.insertAfter( $parent.parent() );
		} );
	}
 
	$( init );

}( mediaWiki, jQuery ) );